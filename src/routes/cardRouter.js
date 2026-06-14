import { Router } from "express";
import cardController from "../controllers/cardController.js";
import transactionRouter from "./transactionRouter.js";
import cardMiddleware from "../middlewares/cardMiddleware.js";

const router = new Router();

router.route("/").get(cardController.getCards).post(cardController.createCard);

router
  .route("/:id")
  .get(cardMiddleware.validateCard, cardController.getCard)
  .delete(cardMiddleware.validateCard, cardController.deleteCard);

router.use("/:id/transactions", cardMiddleware.validateCard, transactionRouter);

export default router;
