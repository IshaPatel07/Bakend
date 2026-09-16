import express from "express";
import { insertBook } from "../controller/book_controller.js";

const router = express.Router();

router.post("/", insertBook);

export default router;
