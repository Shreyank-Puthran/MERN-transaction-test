import mongoose from "mongoose";
import Wallet from "../models/Wallet.js";
import Order from "../models/Order.js";
import Ledger from "../models/Ledger.js";
import { callFulfillmentAPI } from "../utils/fulfillmentService.js";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const clientId = req.headers["client-id"];
    const { amount } = req.body;

    if (!clientId || !amount) {
      return res.status(400).json({ message: "client-id and amount required" });
    }

    const wallet = await Wallet.findOne({ clientId }).session(session);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (wallet.balance < amount) {
      throw new Error("Insufficient wallet balance");
    }

    // deduct wallet balance
    wallet.balance -= amount;
    await wallet.save({ session });

    // create ledger entry
    await Ledger.create(
      [
        {
          clientId,
          type: "debit",
          amount,
          balanceAfter: wallet.balance
        }
      ],
      { session }
    );

    // create order
    const order = await Order.create(
      [
        {
          clientId,
          amount,
          status: "created"
        }
      ],
      { session }
    );

    const orderDoc = order[0];

    // call fulfillment API
    const fulfillmentId = await callFulfillmentAPI(clientId, orderDoc._id);

    orderDoc.fulfillmentId = fulfillmentId;
    await orderDoc.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Order created successfully",
      order: orderDoc
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: error.message
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const clientId = req.headers["client-id"];
    const { order_id } = req.params;

    const order = await Order.findOne({
      _id: order_id,
      clientId
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
