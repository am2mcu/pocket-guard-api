import { Schema, model } from "mongoose";

const labelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [100, "Name cannot be more than 100 characters"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      maxLength: [100, "Description cannot be more than 200 characters"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

labelSchema.index(
  { name: 1, user: 1 },
  { unique: [true, "Label name must be unique"] },
);

labelSchema.virtual("id").get(function () {
  return this._id.toString();
});

export default model("Label", labelSchema);
