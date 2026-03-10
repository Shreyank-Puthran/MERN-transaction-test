import Wallet from "../models/Wallet.js";
import Ledger from "../models/Ledger.js";

export const creditWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    if (!client_id || !amount) {
      return res.status(400).json({ message: "client_id and amount required" });
    }

    let wallet = await Wallet.findOne({ clientId: client_id });

    if (!wallet) {
      wallet = await Wallet.create({
        clientId: client_id,
        balance: 0
      });
    }

    wallet.balance += amount;
    await wallet.save();

    await Ledger.create({
      clientId: client_id,
      type: "credit",
      amount,
      balanceAfter: wallet.balance
    });

    res.json({
      message: "Wallet credited successfully",
      balance: wallet.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const debitWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    const wallet = await Wallet.findOne({ clientId: client_id });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Ledger.create({
      clientId: client_id,
      type: "debit",
      amount,
      balanceAfter: wallet.balance
    });

    res.json({
      message: "Wallet debited successfully",
      balance: wallet.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getWalletBalance = async (req, res) => {
  try {
    const clientId = req.headers["client-id"];

    const wallet = await Wallet.findOne({ clientId });

    if (!wallet) {
      return res.json({ balance: 0 });
    }

    res.json({
      balance: wallet.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};