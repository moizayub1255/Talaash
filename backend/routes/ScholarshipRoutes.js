import express from "express";
import {
  applyScholarshipController,
  createScholarshipController,
  getAllScholarshipController,
} from "../controllers/scholarshipController.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-scholarship", createScholarshipController);

router.post("/scholarship/:id", applyScholarshipController);

//GET JOBS || GET
router.get("/get-scholarship", getAllScholarshipController);

export default router;
