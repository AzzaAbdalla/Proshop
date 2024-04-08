import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.methods.matchPassword = async function (inputPass) {
  return await bcrypt.compare(inputPass, this.password);
};

userSchema.pre("save", async function (name) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("USer", userSchema);
export default User;
