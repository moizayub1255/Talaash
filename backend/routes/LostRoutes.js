// DELETE LOST ITEM
import cors from "cors";
import express from "express";

import {
  applylostController,
  createLostController,
  deleteLostController,
  getAllLostController,
  getSingleLostController,
  LostPhotoController,
} from "../controllers/lostController.js";
import upload from "../utils/multerConfig.js";

const router = express.Router();

router.delete("/delete-lost/:id", deleteLostController);
// Add multer middleware for image upload
router.post("/create-lost", upload.single("image"), createLostController);
// router.post("/create-lost", requireAuth, upload.single("image"), createLostController);

// router.post("/apply/:id", requireAuth, applylostController);
router.post("/apply/:id", applylostController);

router.get("/get-lost", getAllLostController);

router.get("/lost/:id", getSingleLostController);

router.get("/lost-photo/:id", cors(), LostPhotoController);

export default router;
