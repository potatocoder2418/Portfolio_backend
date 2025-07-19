import mongoose from "mongoose";
import Admin from "../models/admin.models.js";

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email/ password error" });
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  if (admin.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  return res.json({ message: "Logged in successfully" });
};

export const getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  res.json(admin);
};
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // 3. Create and save admin (plain password - NOT RECOMMENDED FOR PRODUCTION)
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    // 4. Return response (excluding password in response)
    const adminData = newAdmin.toObject();
    delete adminData.password;

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
