import mongoose from "mongoose";

// mongodb connection setup mongodb isse connect hoga

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Screnn-store");
    console.log("database connect successfully !");
  } catch (err) {
    console.log("Datebase connection failed : ERROR -" + err.message);
  }
};
