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
router.post("/create-scholarship",createScholarshipController);
// router.post("/create-scholarship", requireAuth,createScholarshipController);

router.post("/apply/:id",applyScholarshipController);
// router.post("/apply/:id", requireAuth,applyScholarshipController);

//GET JOBS || GET
router.get("/get-scholarship", getAllScholarshipController);

router.get("/scholarship/:id", getSingleScholarshipController);


export default router;
