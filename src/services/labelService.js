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

  async getInitialBalanceLabel() {
    const label = await Label.findOne({ name: "init" });

    if (!label)
      return await this.createLabel({
        name: "init",
        description: "Initial Balance",
        color: "#009966",
      });

    return label;
  }

  async getLabelByName(name) {
    return await Label.findOne({ name });
  }

  async createLabel(data) {
    const { name, description, color } = data;
    return await Label.create({ name, description, color });
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
