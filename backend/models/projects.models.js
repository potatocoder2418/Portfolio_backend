import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true }, // Cloudinary ID
  url: { type: String, required: true }, // Cloudinary URL
  altText: { type: String, default: "" },
});

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pic: imageSchema, // Now an object (not string) for Cloudinary uploads
    date: { type: Date, default: Date.now },
    github_link: { type: String, required: true },
    deployed_link: { type: String, required: true },
    description: { type: String, required: true },
    tech_stack: [{ type: String, required: true }],
    features: [{ type: String, required: true }],
    screenshots: [imageSchema], // Array of Cloudinary images
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
