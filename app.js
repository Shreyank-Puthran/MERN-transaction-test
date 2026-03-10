import express from "express";

import walletRoutes from "./routes/walletRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());

app.use(walletRoutes);
app.use(orderRoutes);

export default app;