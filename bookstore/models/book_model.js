import mongoose from "mongoose";

// book ka schema mtlb book ka structure book ke liye kya required hai ye yaha likha jayega ki hume client ke pass se kya kya mangvana hai
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String },
  },
  { timestamps: true },
);

// model => actual object whuch helps to intrect with database
// model hai jo ye sab data ko data base ke sath kam krne me madad krta hai

export const Book = mongoose.model("bookstore", bookSchema);
