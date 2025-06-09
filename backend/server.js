import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables and connect to the database
dotenv.config();
connectDB();

const CLERK_API_KEY = process.env.CLERK_API_KEY;

// Initialize Express application
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Define routes
app.use("/api/v1/auth", userRoutes);
app.use("/api", jobRoutes);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Set the port from environment variables or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
