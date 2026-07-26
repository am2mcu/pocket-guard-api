import { Types } from "mongoose";
import Transaction from "../models/transactionModel.js";
import labelService from "./labelService.js";

class TransactionService {
  async _getFilter(card, query) {
    const filter = {};

    if (card) filter.card = card;

    if (query.type === "income") filter.amount = { $gt: 0 };
    else if (query.type === "expenses") filter.amount = { $lt: 0 };

    if (query.label) {
      const label = await labelService.getLabelByName(query.label);
      filter.label = label.id;
    }

    return filter;
  }

  async getTransactions(card, query, userId) {
    const filter = await this._getFilter(card, query);
    filter.user = userId;
    return await Transaction.find(filter);
  }

  async createTransaction(card, data, userId) {
    const { amount, description, label } = data;
    const transaction = await Transaction.create({
      amount,
      description,
      label,
      card,
      user: userId,
    });
    return await Transaction.findById(transaction.id); // label won't be populated otherwise
  }

  async updateTransaction(id, data) {
    const { amount, description, label } = data;

    return await Transaction.findByIdAndUpdate(
      id,
      {
        amount,
        description,
        label,
      },
      { runValidators: true, returnDocument: "after" },
    );
  }

  async deleteTransaction(id) {
    return await Transaction.findByIdAndDelete(id);
  }

  async deleteCardTransactions(card) {
    const transactions = await Transaction.deleteMany({ card });
    return transactions;
  }

  async deleteLabel(label) {
    return await Transaction.updateMany({ label }, { $unset: { label: "" } });
  }

  async getStats(card) {
    const matchExpr = {};
    if (card) matchExpr.card = new Types.ObjectId(card);

    const stats = await Transaction.aggregate([
      {
        $match: matchExpr,
      },
      {
        $group: {
          _id: "$label",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "labels",
          localField: "_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: { _id: 0, id: "$_id", name: 1, color: 1 },
            },
          ],
          as: "label",
        },
      },
      {
        $set: { label: { $first: "$label" } },
      },
      {
        $group: {
          _id: null,
          income: {
            $push: {
              $cond: [
                { $gt: ["$total", 0] },
                { label: "$label", total: "$total" },
                "$$REMOVE",
              ],
            },
          },
          expenses: {
            $push: {
              $cond: [
                { $lt: ["$total", 0] },
                { label: "$label", total: "$total" },
                "$$REMOVE",
              ],
            },
          },
          totalIncome: {
            $sum: { $cond: [{ $gt: ["$total", 0] }, "$total", 0] },
          },
          totalExpenses: {
            $sum: { $cond: [{ $lt: ["$total", 0] }, "$total", 0] },
          },
        },
      },
      {
        $addFields: {
          totalBalance: { $add: ["$totalIncome", "$totalExpenses"] },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    return stats[0];
  }
}

export default new TransactionService();
