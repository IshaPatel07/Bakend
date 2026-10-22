import express from "express";
import { connectDB } from "./config/db.js";
import book_router from "./routes/book_router.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/book", book_router);

app.listen(4000, () => {
  console.log("server start successfully !!");
});
