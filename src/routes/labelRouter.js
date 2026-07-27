import { Router } from "express";
import labelController from "../controllers/labelController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = new Router();

router.use(authenticate);

router
  .route("/")
  .get(labelController.getLabels)
  .post(labelController.createLabel);

router
  .route("/:id")
  .patch(labelController.updateLabel)
  .delete(labelController.deleteLabel);

export default router;
