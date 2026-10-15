
import express from "express";
import auth from "../middleware/auth.js";
import {
  createOrder,
  getMyOrders,
  getOrderById
} from "../controllers/orderController.js";

const router = express.Router();

router.use(auth);

router.post("/", createOrder);
router.get("/my", getMyOrders);
router.get("/:id", getOrderById);

export default router;
