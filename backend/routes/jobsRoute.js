import express from "express";
import {
  applyJobController,
  createJobController,
  deleteJobController,
  getAllJobsController,
  getJobByIdController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";
import { requireAuth } from "@clerk/express";
import { protectRoute } from "../middelwares/clerkAuth.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job",protectRoute,requireAuth, createJobController);


router.post("/apply/:id",protectRoute, requireAuth, applyJobController);


//GET JOBS || GET
router.get("/get-job",protectRoute, requireAuth,getAllJobsController);

//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id",  deleteJobController);

// JOBS STATS FILTER || GET
router.get("/job-stats",  jobStatsController);

router.get("/:id", getJobByIdController);


export default router;
