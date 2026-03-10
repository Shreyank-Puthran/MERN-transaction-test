import express from "express";
import {
  createOrder,
  getOrderDetails
} from "../controllers/orderController.js";

const router = express.Router();


router.post("/orders", createOrder);


router.get("/orders/:order_id", getOrderDetails);

export default router;