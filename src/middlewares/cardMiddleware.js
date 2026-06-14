import asyncHandler from "express-async-handler";
import cardService from "../services/cardService.js";

class CardMiddleware {
  validateCard = asyncHandler(async (req, res, next) => {
    const card = await cardService.getCard(req.params.id);

    req.card = card;
    next();
  });
}

export default new CardMiddleware();
