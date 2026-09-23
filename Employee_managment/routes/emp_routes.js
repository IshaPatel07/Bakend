import express from "express";
import {
  deleteEmployee,
  displayEmployee,
  insertEmployee,
  searchById,
  searchByName,
  searchByRole,
  updateEmployee,
} from "../controller/emp_controller";

const router = express.Router();

router.get("/", displayEmployee);
router.post("/", insertEmployee);
router.put("/", updateEmployee);
router.delete("/id", deleteEmployee);

router.get("/id", searchById);
router.get("/name:name", searchByName);
router.get("/role", searchByRole);

export default router;
