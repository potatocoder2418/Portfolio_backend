import express from "express";

import { uploadProjectFiles } from "../middlewares/upload.middlewares.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
} from "../controllers/project.controllers.js";

const projectRouter = express.Router();

projectRouter.post("/", uploadProjectFiles, createProject);

projectRouter.delete("/:id", deleteProject);
projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);

export default projectRouter;
