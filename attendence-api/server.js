
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Faculty from "./models/Faculty.js";
import Attendance from "./models/Attendance.js";
import auth from "./middleware/auth.js";

const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/attendance");
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Mark attendance
app.post("/attendance", auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Present or Absent",
      });
    }

    const date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const attendance = await Attendance.create({
      faculty: req.facultyId,
      date,
      status,
    });

    res.status(201).json({
      message: "Attendance marked",
      attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Attendance already marked today",
      });
    }

    res.status(500).json({
      message: "Unable to mark attendance",
    });
  }
});

// Get today's attendance of logged-in faculty
app.get("/attendance/today", auth, async (req, res) => {
  try {
    const date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const attendance = await Attendance.findOne({
      faculty: req.facultyId,
      date,
    });

    res.json({
      date,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch attendance",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
