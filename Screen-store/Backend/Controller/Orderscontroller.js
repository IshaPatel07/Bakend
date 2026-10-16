
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

// Place order using cart
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.userId
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty"
      });
    }

    const items = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image || ""
      }));

    if (items.length === 0) {
      return res.status(400).json({
        message: "No valid products found in cart"
      });
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.userId,
      items,
      total,
      status: "Placed"
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one order belonging to the logged-in user
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid order ID"
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.userId
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
