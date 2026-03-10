import express from "express";
import cors from "cors";

import walletRoutes from "./routes/walletRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use(walletRoutes);
app.use(orderRoutes);

export default app;