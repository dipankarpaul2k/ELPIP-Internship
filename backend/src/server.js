import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Local imports
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
// Localhost: http://localhost:5173
// Render: https://taskshare-frontend.onrender.com
app.use(
  cors({
    origin: "https://taskshare-frontend.onrender.com",
    credentials: true,
  })
);
app.use(cookieParser());

// Connect to database
connectDB();

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// http://localhost:5000
