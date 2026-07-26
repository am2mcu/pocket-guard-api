import asyncHandler from "express-async-handler";
import transactionService from "../services/transactionService.js";

class TransactionController {
  getTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await transactionService.getTransactions(
      req.card?.id,
      req.query,
      req.user.id,
    );
    res.status(200).json({ transactions, total: transactions.length });
  });

  createTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await transactionService.createTransaction(
      req.card.id,
      req.body,
      req.user.id,
    );
    res.status(201).json({ transaction });
  });

  updateTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.body,
    );
    res.status(200).json({ transaction });
  });

  deleteTransaction = asyncHandler(async (req, res, next) => {
    await transactionService.deleteTransaction(req.params.id, req.user.id);
    res.status(204).json(null);
  });

  getStats = asyncHandler(async (req, res, next) => {
    const stats = await transactionService.getStats(req.card?.id, req.user.id);
    res.status(200).json({ stats });
  });
}

export default new TransactionController();
