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
import userAuth from "../middelwares/authMiddleware.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-job", createJobController);


router.post("/apply/:id", applyJobController);


//GET JOBS || GET
router.get("/get-job", getAllJobsController);

//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

// JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);

router.get("/:id", getJobByIdController);


export default router;
