import { Schema, model } from "mongoose";

const cardSchema = new Schema(
  {
    number: {
      type: String,
      required: [true, "Card number is required"],
      unique: [true, "Card number must be unique"],
      trim: true,
      match: [/^[0-9]{16}/, "Card number is not valid"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
      },
    },
  },
);

cardSchema.virtual("id").get(function () {
  return this._id.toString();
});

cardSchema.pre("save", function () {
  this.number =
    this.number.slice(0, 4) + "****" + "****" + this.number.slice(12, 16);
});

export default model("Card", cardSchema);
