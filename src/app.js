import express from "express";
import cors from "cors";
import transactionRouter from "./routes/transactionRouter.js";
import labelRouter from "./routes/labelRouter.js";
import cardRouter from "./routes/cardRouter.js";

const app = express();

app.use(express.json());
app.use(
  cors({ origin: ["http://localhost:5173", process.env.ALLOWED_ORIGIN] }),
);

app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/labels", labelRouter);
app.use("/api/v1/cards", cardRouter);

export default app;
