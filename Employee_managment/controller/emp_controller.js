import { employee } from "../models/emp_models.js";

export const insertEmployee = async (req, res) => {
  try {
    const employee = req.body;
    const result = await employee.create(employee);
    res.json({
      status: true,
      message: "Employee insert successfully !!",
      result,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee insert failed !!",
      err: err.message,
    });
  }
};
export const displayEmployee = async (req, res) => {
  try {
    const data = await employee.find();
    res.json({
      status: true,
      message: "Employee fetched successfully !!",
      data,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee fetched failed !!",
      err: err.message,
    });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const id = req.body.id;
    const employee = req.body;
    const result = await employee.findByIdAndUpdate(id, employee);
    res.json({
      status: true,
      message: "Employee update successfully !!",
      result,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee update failed !!",
      err: err.message,
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await employee.findByIdAndDelete(id);
    res.json({
      status: true,
      message: "Employee deleted successfully !!",
      result,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee delete failed !!",
      err: err.message,
    });
  }
};
export const searchByName = async (req, res) => {
  try {
    const name = req.params.name;
    const data = await employee.find(name);
    res.json({
      status: true,
      message: "Employee searched successfully !!",
      data,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee not found !!",
      err: err.message,
    });
  }
};
export const searchById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await employee.find(id);
    res.json({
      status: true,
      message: "Employee searched successfully !!",
      data,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee not found !!",
      err: err.message,
    });
  }
};
export const searchByRole = async (req, res) => {
  try {
    const role = req.params.role;
    const data = await employee.find(role);
    res.json({
      status: true,
      message: "Employee searched successfully !!",
      data,
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "employee not found!!",
      err: err.message,
    });
  }
};
