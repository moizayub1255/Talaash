import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Admin Routes
router.post("/admin/job", createJob);
router.put("/admin/job/:id", updateJob);
router.delete("/admin/job/:id", deleteJob);

// Public Routes
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);

export default router;