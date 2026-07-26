import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: [true, "amount is required"] },
    description: {
      type: String,
      maxLength: [200, "description cannot be more than 200 characters"],
    },
    label: {
      type: Schema.Types.ObjectId,
      ref: "Label",
    }, // parent to child
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: [true, "Card is required"],
    }, // child to parent
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: { type: Date, default: Date.now(), select: false },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

transactionSchema.virtual("id").get(function () {
  return this._id.toString();
});

transactionSchema.pre(/^find*/, function () {
  this.populate("label");
});

export default model("Transaction", transactionSchema);
