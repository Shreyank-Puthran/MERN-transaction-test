import express from "express";
import {
  createOrder,
  getOrderDetails
} from "../controllers/orderController.js";

const router = express.Router();

// Create order
router.post("/orders", createOrder);

// Get order details
router.get("/orders/:order_id", getOrderDetails);

export default router;