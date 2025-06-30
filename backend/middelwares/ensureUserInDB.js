import User from "../models/User.js";

const ensureUserInDB = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      console.log(" No Clerk user ID found");
      return next();
    }

    const existing = await User.findOne({ clerkUserId });

    if (!existing) {
      const newUser = await User.create({
        clerkUserId,
        email: req.auth?.sessionClaims?.email,
        name: req.auth?.sessionClaims?.firstName || "Unknown",
      });

      console.log(" User added to MongoDB:", newUser);
    }

    next();
  } catch (error) {
    console.error(" Error in ensureUserInDB:", error);
    res.status(500).json({ error: "Failed to verify/create user" });
  }
};

export default ensureUserInDB;
