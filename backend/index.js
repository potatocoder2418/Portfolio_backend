import express from "express";
import connectDB from "./utils/db.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes.js";
import projectRouter from "./routes/project.routes.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json("Backend is on");
});
app.use("/api/auth", adminRouter);
app.use("/api/projects", projectRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server running on port http://localhost:${PORT}`);
});
