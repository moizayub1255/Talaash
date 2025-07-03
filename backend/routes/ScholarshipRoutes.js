import express from "express";
import {
  applyScholarshipController,
  createScholarshipController,
  getAllScholarshipController,
  getSingleScholarshipController,
} from "../controllers/scholarshipController.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-scholarship", createScholarshipController);

router.post("/apply/:id", applyScholarshipController);

//GET JOBS || GET
router.get("/get-scholarship", getAllScholarshipController);

router.get("/scholarship/:id", getSingleScholarshipController);


export default router;
