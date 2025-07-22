import express from "express";
import { applylostController, createLostController, getAllLostController, getSingleLostController } from "../controllers/lostController.js";
import { requireAuth } from "../middelwares/clerkAuthMiddleware.js";
import upload from "../middelwares/multer.js";

const router = express.Router();

//routes
// CREATE JOB || POST


// router.post('/create-lost', requireAuth, upload.single('image'), async (req, res) => {
//   try {
//     console.log("REQ FILE", req.file); // ✅ confirm file is received

//     const newLostItem = new Lost({
//       itemName: req.body.itemName,
//       itemType: req.body.itemType,
//       description: req.body.description,
//       location: req.body.location,
//       date: req.body.date,
//       reporterName: req.body.reporterName,
//       reporterEmail: req.body.reporterEmail,
//       reporterPhone: req.body.reporterPhone,
//       status: req.body.status || "pending",
//       image: req.file.path, // 🟢 Cloudinary URL from multer config
//     });

//     await newLostItem.save();
//     res.status(201).json({ success: true, data: newLostItem });
//   } catch (err) {
//     console.error("💥 Backend error in create-lost:", err);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// });


router.post(
  "/create-lost",
  requireAuth,
  upload.single("image"),
  createLostController // ✅ use the updated controller
);


router.post("/apply/:id",requireAuth, applylostController);

//GET JOBS || GET
router.get("/get-lost", getAllLostController);

router.get("/lost/:id", getSingleLostController);


export default router;
