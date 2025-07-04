import express from "express";
import UserModel from "../models/UserModel.js";
const router = express.Router();

router.post("/clerk-user", async (req, res) => {
  try {
  const { clerkId, email, username, image } = req.body;

  let user = await UserModel.findOne({ $or: [{ clerkId }, { email }] });

  if (!user) {
    user = await UserModel.create({
      clerkId,
      email,
      username,
      image,
    });
  }

  res.status(200).json({ message: "User processed successfully", user });
} catch (error) {
  // 👇 Bas is catch me ye karo — console me likho, response mat bhejo
  console.error("❌ Error creating user (probably duplicate):", error.message);
  res.status(200).json({ message: "User already exists or something went wrong" });
}

});


export default router;
