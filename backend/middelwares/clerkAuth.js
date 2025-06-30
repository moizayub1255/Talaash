// middleware/clerkAuth.js
import { requireAuth } from '@clerk/express';

export const protectRoute = requireAuth({
  unauthorized: (req, res) => {
    res.status(401).json({ message: "You must be signed in to access this route." });
  },
});
