import Project from "../models/projects.models.js";
import cloudinary from "../config/cloudinary.config.js";
import { uploadToCloudinary } from "../middlewares/upload.middlewares.js";

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      tech_stack,
      features,
      github_link,
      deployed_link,
    } = req.body;

    // Check if pic was uploaded
    if (!req.files["pic"] || req.files["pic"].length === 0) {
      return res.status(400).json({ message: "Project image is required" });
    }

    // Upload main project image
    const picResult = await uploadToCloudinary(req.files["pic"][0].buffer);

    // Upload screenshots (optional)
    let screenshotsResult = [];
    if (req.files["screenshots"] && req.files["screenshots"].length > 0) {
      screenshotsResult = await Promise.all(
        req.files["screenshots"].map((file) => uploadToCloudinary(file.buffer))
      );
    }

    // Create project in the database
    const project = await Project.create({
      name,
      description,
      tech_stack: JSON.parse(tech_stack),
      features: JSON.parse(features),
      github_link,
      deployed_link,
      pic: {
        public_id: picResult.public_id,
        url: picResult.secure_url,
      },
      screenshots: screenshotsResult.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      })),
    });

    res.status(201).json({
      message: "Project created successfully",
      project: project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Failed to create project. Please try again" });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete main image from Cloudinary
    await cloudinary.uploader.destroy(project.pic.public_id);

    // Delete screenshots from Cloudinary
    if (project.screenshots && project.screenshots.length > 0) {
      await Promise.all(
        project.screenshots.map((screenshot) =>
          cloudinary.uploader.destroy(screenshot.public_id)
        )
      );
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Faield to fetch project" });
  }
};
