import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = new Router();

router.use(authenticate);

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
