import asyncHandler from "express-async-handler";
import cardService from "../services/cardService.js";

class CardController {
  getCards = asyncHandler(async (req, res, next) => {
    const cards = await cardService.getCards();
    res.status(200).json({
      cards,
      total: cards.length,
    });
  });

  getCard = asyncHandler(async (req, res, next) => {
    res.status(200).json({
      card: req.card,
    });
  });

  createCard = asyncHandler(async (req, res, next) => {
    const card = await cardService.createCard(req.body);
    res.status(201).json({
      card,
    });
  });

  deleteCard = asyncHandler(async (req, res, next) => {
    await cardService.deleteCard(req.params.id);
    res.status(204).json(null);
  });
}

export default new CardController();
