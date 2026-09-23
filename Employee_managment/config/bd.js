import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employees");
    console.log("data base connected successfully !!");
  } catch (err) {
    console.log("database connection  failed !" + err.message);
  }
};
