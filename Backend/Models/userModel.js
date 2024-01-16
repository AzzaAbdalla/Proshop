import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdim: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { Timestamps: true }
);

const User = mongoose.model("USer", userSchema);
export default User;
