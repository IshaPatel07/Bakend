
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get logged-in user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = await Cart.create({
        user: req.userId,
        items: []
      });
    }

    await cart.populate("items.product");

    const items = cart.items
      .filter((item) => item.product)
      .map((item) => ({
        product: item.product,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity
      }));

    const total = items.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const itemCount = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.json({ success: true, items, total, itemCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const quantity = Number(req.body.quantity ?? 1);

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Valid productId is required"
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return res.status(400).json({
        message: "Quantity must be between 1 and 99"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = await Cart.create({
        user: req.userId,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > 99) {
        return res.status(400).json({
          message: "Maximum quantity is 99"
        });
      }

      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product quantity; quantity 0 removes it
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const quantity = Number(req.body.quantity);

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) {
      return res.status(400).json({
        message: "Quantity must be between 0 and 99"
      });
    }

    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.json({
      success: true,
      message: "Cart updated",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove one product
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Product removed from cart",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({
      success: true,
      message: "Cart cleared successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
