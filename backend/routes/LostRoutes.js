import express from "express";
import { applylostController, createLostController, getAllLostController, getSingleLostController } from "../controllers/lostController.js";

const router = express.Router();

//routes
// CREATE JOB || POST
router.post("/create-lost", createLostController);

router.post("/apply/:id", applylostController);

//GET JOBS || GET
router.get("/get-lost", getAllLostController);

router.get("/lost/:id", getSingleLostController);


export default router;
