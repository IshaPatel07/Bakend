import express from "express";
import connectDB from "./config/bd.js";
import employe_routes from "./routes/emp_routes.js";
const app = express();

app.use(express.json());

connectDB();

app.use("/api/employee", employe_routes);

app.listen(5000, () => {
  console.log("server started successfully !!");
});
