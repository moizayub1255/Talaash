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

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job", createJobController);
// router.post("/create-job",  requireAuth,createJobController);


router.post("/apply/:id", applyJobController);


//GET JOBS || GET
router.get("/get-job",getAllJobsController);

//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id",  deleteJobController);

// JOBS STATS FILTER || GET
router.get("/job-stats",  jobStatsController);

router.get("/:id", getJobByIdController);


export default router;
