import { Router } from "express";
import transactionController from "../controllers/transactionController.js";

const router = new Router();

router
  .route("/")
  .get(transactionController.getTransactions)
  .post(transactionController.createTransaction);

router.route("/stats").get(transactionController.getStats);

router
  .route("/:id")
  .put(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

export default router;
