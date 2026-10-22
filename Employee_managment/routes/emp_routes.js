import express from "express";
import {
  deleteEmployee,
  displayEmployee,
  insertEmployee,
  searchById,
  searchByName,
  searchByRole,
  updateEmployee,
} from "../controller/emp_controller.js";

const router = express.Router();

router.post("/", insertEmployee);
router.get("/", displayEmployee);

router.get("/name/:name", searchByName);
router.get("/role/:role", searchByRole);
router.get("/:id", searchById);

router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
