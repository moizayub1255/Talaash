import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only routes
router.post("/admin/job", requireAdmin, createJob);
router.put("/admin/job/:id", requireAdmin, updateJob);
router.delete("/admin/job/:id", requireAdmin, deleteJob);

// Public routes
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);

export default router;
