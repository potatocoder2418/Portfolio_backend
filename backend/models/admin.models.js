import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
