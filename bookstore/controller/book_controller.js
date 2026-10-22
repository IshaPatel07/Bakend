import { Book } from "../models/book_model.js";

// controller => controller is one type of function where specified proccess to handle request

//controller client ke pass se aaye hueee request ko handle krta hai

export const insertBook = async (req, res) => {
  try {
    res.json({
      message: "Book insert successfully !",
    });
  } catch (err) {
    res.status(500).json({
      message: "Book insertion failed !",
      err: err.message,
    });
  }
};
