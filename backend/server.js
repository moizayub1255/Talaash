// -------------------- API Documentation --------------------
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// -------------------- Package Imports --------------------
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// -------------------- Security Packages --------------------
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// -------------------- File Imports --------------------
import connectDB from "./config/db.js";
import errroMiddelware from "./middelwares/errroMiddleware.js";
import jobsRoutes from "./routes/jobsRoute.js";
import ScholarshipRoutes from "./routes/ScholarshipRoutes.js";
import LostRoutes from "./routes/LostRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// -------------------- Utilities --------------------
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// -------------------- App Config --------------------
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -------------------- Connect to MongoDB --------------------
connectDB();

// -------------------- CORS Config --------------------
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Frontend origin
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight handling

// -------------------- Middlewares --------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("dev"));

// -------------------- Serve Uploads with CORS Header --------------------
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// -------------------- Swagger Setup --------------------
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerDoc(swaggerOptions);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// -------------------- Routes --------------------
app.use("/api/v1/job", jobsRoutes);
app.use("/api/v1/scholarship", ScholarshipRoutes);
app.use("/api/v1/lost", LostRoutes);
app.use("/api/auth", authRoutes);

// -------------------- Error Handler --------------------
app.use(errroMiddelware);

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node Server Running on port no ${PORT}`.bgCyan.white);
});
