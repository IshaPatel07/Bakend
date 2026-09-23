import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    emp_id: { type: Number, requered: true },
    name: { type: String, requered: true },
    age: { type: Number, requered: true },
    role: { type: String, requered: true },
    addrest: { type: String, requered: true },
  },
  { timestamps: true },
);

export const employee = mongoose.model("employees", employeeSchema);
