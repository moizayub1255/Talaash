import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/db.js";
import errroMiddelware from "./middelwares/errroMiddleware.js";
import jobsRoutes from "./routes/jobsRoute.js";
import ScholarshipRoutes from "./routes/ScholarshipRoutes.js";
import LostRoutes from "./routes/LostRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://talaash-ucp.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("dev"));

app.use("/api/v1/job", jobsRoutes);
app.use("/api/v1/scholarship", ScholarshipRoutes);
app.use("/api/v1/lost", LostRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/cv", cvRoutes);

app.use(errroMiddelware);

//console port
// app.listen(process.env.PORT || 5050, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

export default app;
