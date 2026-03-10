import express from "express";
import {
  creditWallet,
  debitWallet,
  getWalletBalance
} from "../controllers/walletController.js";

const router = express.Router();

// Admin routes
router.post("/admin/wallet/credit", creditWallet);
router.post("/admin/wallet/debit", debitWallet);

// Client route
router.get("/wallet/balance", getWalletBalance);

export default router;