import express from "express";
import UserModel from "../models/UserModel.js";
const router = express.Router();

router.post("/clerk-user", async (req, res) => {
  try {
    const { clerkId, email, username, image } = req.body;

    let user = await UserModel.findOne({ clerkId });

    if (!user) {
      user = await UserModel.create({
        clerkId,
        email,
        username,
        image,
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
