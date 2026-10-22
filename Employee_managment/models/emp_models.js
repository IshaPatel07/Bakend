import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    emp_id: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true },
);

export const employee = mongoose.model("employees", employeeSchema);
