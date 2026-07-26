import Label from "../models/labelModel.js";
import transactionService from "./transactionService.js";

class LabelService {
  async getLabels(query, userId) {
    const { s = "" } = query;
    return await Label.find({
      name: { $regex: s, $options: "i" },
      user: userId,
    });
  }

  async getInitialBalanceLabel(userId) {
    const label = await Label.findOne({ name: "init", user: userId });

    if (!label)
      return await this.createLabel({
        name: "init",
        description: "Initial Balance",
        color: "#009966",
        user: userId,
      });

    return label;
  }

  async getLabelByName(name) {
    return await Label.findOne({ name });
  }

  async createLabel(data, userId) {
    const { name, description, color } = data;
    return await Label.create({ name, description, color, user: userId });
  }

  async updateLabel(id, data) {
    const { name, description, color } = data;
    return await Label.findByIdAndUpdate(
      id,
      { name, description, color },
      { returnDocument: "after", runValidators: true },
    );
  }

  async deleteLabel(id) {
    const label = await Label.findByIdAndDelete(id);
    await transactionService.deleteLabel(id);
    return label;
  }
}

export default new LabelService();
