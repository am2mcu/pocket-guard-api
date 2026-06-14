import asyncHandler from "express-async-handler";
import labelService from "../services/labelService.js";

class LabelController {
  getLabels = asyncHandler(async (req, res, next) => {
    const labels = await labelService.getLabels(req.query);
    res.status(200).json({ labels, total: labels.length });
  });

  createLabel = asyncHandler(async (req, res, next) => {
    const label = await labelService.createLabel(req.body);
    res.status(201).json({ label });
  });

  updateLabel = asyncHandler(async (req, res, next) => {
    const label = await labelService.updateLabel(req.params.id, req.body);
    res.status(200).json({ label });
  });

  deleteLabel = asyncHandler(async (req, res, next) => {
    await labelService.deleteLabel(req.params.id);
    res.status(204).json(null);
  });
}

export default new LabelController();
