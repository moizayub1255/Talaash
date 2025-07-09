import express from "express";
import { applylostController, createLostController, getAllLostController, getSingleLostController } from "../controllers/lostController.js";
import { requireAuth } from "../middelwares/clerkAuthMiddleware.js";
const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-lost",requireAuth, createLostController);

router.post("/apply/:id",requireAuth, applylostController);

//GET JOBS || GET
router.get("/get-lost", getAllLostController);

router.get("/lost/:id", getSingleLostController);


export default router;
