import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose
  .connect("mongodb://localhost:27017/colleg")
  .then(() => console.log("Database connect Successfully !"))
  .catch((err) => console.log(err.message));

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Students = mongoose.model("vidhyarthi", Schema);

app.get("/", async (req, res) => {
  const data = await Students.find();
  res.json(data);
});
app.post("/", async (req, res) => {
  await Students.create({ name: "nisha", course: "B.tech" });
  res.send("Student added successfully !");
});

app.listen(4000, () => {
  console.log("server start successfully !");
});
