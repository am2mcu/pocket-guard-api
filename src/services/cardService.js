import Card from "../models/cardModel.js";
import transactionService from "./transactionService.js";
import labelService from "./labelService.js";

class CardService {
  async getCards(userId) {
    return await Card.find({ user: userId });
  }

  async getCard(id) {
    return await Card.findById(id);
  }

  async createCard(data) {
    const { number, balance } = data;

    const card = await Card.create({
      number,
    });

    const label = await labelService.getInitialBalanceLabel();

    await transactionService.createTransaction(card.id, {
      amount: balance,
      description: "Initial balance",
      label: label.id,
    });

    return card;
  }

  async deleteCard(id) {
    const card = await Card.findByIdAndDelete(id);
    await transactionService.deleteCardTransactions(card.id);
    return card;
  }
}

export default new CardService();
