import { Router } from "express";
import labelController from "../controllers/labelController.js";

const router = new Router();

router
  .route("/")
  .get(labelController.getLabels)
  .post(labelController.createLabel);

router
  .route("/:id")
  .patch(labelController.updateLabel)
  .delete(labelController.deleteLabel);

export default router;
