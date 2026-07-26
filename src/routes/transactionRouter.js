import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = new Router();

router
  .route("/")
  .get(authenticate, transactionController.getTransactions)
  .post(authenticate, transactionController.createTransaction);

router.route("/stats").get(authenticate, transactionController.getStats);

router
  .route("/:id")
  .put(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

export default router;
