import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", (_req,res) => res.json({ success:true, message:"Screen Store API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use((req,res) => res.status(404).json({ success:false, message:"Route not found" }));
app.use((err,_req,res,_next) => {
  console.error(err);
  res.status(500).json({ success:false, message:"Server error" });
});
try {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) throw new Error("Set MONGO_URI and JWT_SECRET in .env");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected Successfully");
  app.listen(process.env.PORT || 5000, () => console.log("API running on http://localhost:5000"));
} catch (e) { console.error("Server startup failed:", e.message); process.exit(1); }