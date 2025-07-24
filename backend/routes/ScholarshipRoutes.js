import express from "express";
const router = express.Router();
import {
  applyScholarshipController,
  createScholarshipController,
  getAllScholarshipController,
  getSingleScholarshipController,
  deleteScholarshipController,
} from "../controllers/scholarshipController.js";

// DELETE SCHOLARSHIP
router.delete("/delete-scholarship/:id", deleteScholarshipController);
//routes
// CREATE JOB || POST
router.post("/create-scholarship", createScholarshipController);
// router.post("/create-scholarship", requireAuth,createScholarshipController);

router.post("/apply/:id", applyScholarshipController);
// router.post("/apply/:id", requireAuth,applyScholarshipController);

//GET JOBS || GET
router.get("/get-scholarship", getAllScholarshipController);

router.get("/scholarship/:id", getSingleScholarshipController);

export default router;
