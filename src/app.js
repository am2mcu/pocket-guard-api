import express from "express";
import transactionRouter from "./routes/transactionRouter.js";
import labelRouter from "./routes/labelRouter.js";
import cardRouter from "./routes/cardRouter.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/labels", labelRouter);
app.use("/api/v1/cards", cardRouter);

export default app;
