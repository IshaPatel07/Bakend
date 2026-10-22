import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: truee },
    email: { type: String, required: truee, unique: true },
    password: { type: String, required: truee },
  },
  { timestamps: true },
);

export const auth = mongoose.model("auth", authSchema);
