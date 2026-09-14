import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/school")
  .then(() => console.log("Database connect Successfully !"))
  .catch((err) => console.log(err.message));

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
    city: { type: String },
  },
  {
    timestamps: true,
  },
);

const Studentmodel = mongoose.model("Students", studentSchema);

await Studentmodel.create({
  name: "hema",
  age: 40,
  course: "designer",
  city: "surat",
});
