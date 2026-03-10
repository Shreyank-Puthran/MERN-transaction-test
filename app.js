import express from "express";
import cors from "cors";

import walletRoutes from "./routes/walletRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(walletRoutes);
app.use(orderRoutes);

export default app;