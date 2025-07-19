import express from "express";
import {
  createAdmin,
  getAdmin,
  Login,
} from "../controllers/admin.controllers.js";

const adminRouter = express.Router();

adminRouter.get("/admin", getAdmin);
adminRouter.post("/admin", Login);
adminRouter.post("/create", createAdmin);
export default adminRouter;
