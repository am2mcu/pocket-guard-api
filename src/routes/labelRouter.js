import { Router } from "express";
import labelController from "../controllers/labelController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = new Router();

router
  .route("/")
  .get(authenticate, labelController.getLabels)
  .post(authenticate, labelController.createLabel);

router
  .route("/:id")
  .patch(labelController.updateLabel)
  .delete(labelController.deleteLabel);

export default router;
