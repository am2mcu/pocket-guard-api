import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cryptography from "../utils/cryptoHandler.js";
import { env } from "../config/env.js";
import { createAuthToken } from "../utils/jwtHandler.js";
import userRole from "../utils/userRole.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: [userRole.ADMIN, userRole.USER],
      default: userRole.USER,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        return ret;
      },
    },
  },
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createAuthToken = async function () {
  const token = await createAuthToken({ id: this._id });
  return token;
};

userSchema.methods.isPasswordChangedAfterToken = function (tokenIssuedAt) {
  // why * 1000 -> getTime returns milliseconds
  // why + 1000 -> passwordChangedAt: 2026-03-04T07:28:23.266Z | tokenIssuedAt: 2026-03-04T07:28:23.000Z -> issue time is less and token will be rejected
  return this.passwordChangedAt?.getTime() > tokenIssuedAt * 1000 + 1000;
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("findOneAndUpdate", async function () {
  if (!this._update.password) return;

  this._update.password = await bcrypt.hash(this._update.password, 12);
});

userSchema.pre("updateOne", async function () {
  if (!this._update.password) return;

  this._update.password = await bcrypt.hash(this._update.password, 12);
});

userSchema.pre("findOneAndUpdate", function () {
  if (!this._update.passwordResetToken) return;

  this._update.passwordResetToken = cryptography.hashToken(
    this._update.passwordResetToken,
  );
});

export default mongoose.model("User", userSchema);
