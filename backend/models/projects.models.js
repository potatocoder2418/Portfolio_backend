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
    github_link: { type: String,  },
    deployed_link: { type: String, },
    description: { type: String,  },
    tech_stack: [{ type: String,  }],
    features: [{ type: String, }],
    screenshots: [imageSchema], // Array of Cloudinary images
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
