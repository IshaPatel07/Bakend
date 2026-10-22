
import { employee } from "../models/emp_models.js";

// 1. Insert Employee
export const insertEmployee = async (req, res) => {
  try {
    const result = await employee.create(req.body);

    res.status(201).json({
      status: true,
      message: "Employee inserted successfully!",
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Employee insert failed!",
      error: err.message,
    });
  }
};

// 2. Display All Employees
export const displayEmployee = async (req, res) => {
  try {
    const data = await employee.find();

    res.json({
      status: true,
      message: "Employees fetched successfully!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

// 3. Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Employee not found!",
      });
    }

    res.json({
      status: true,
      message: "Employee updated successfully!",
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

// 4. Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const result = await employee.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Employee not found!",
      });
    }

    res.json({
      status: true,
      message: "Employee deleted successfully!",
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

// 5. Search Employee By Name
export const searchByName = async (req, res) => {
  try {
    const data = await employee.find({
      name: req.params.name,
    });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

// 6. Search Employee By ID
export const searchById = async (req, res) => {
  try {
    const data = await employee.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Employee not found!",
      });
    }

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

// 7. Search Employee By Role
export const searchByRole = async (req, res) => {
  try {
    const data = await employee.find({
      role: req.params.role,
    });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};
