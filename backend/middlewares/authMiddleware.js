import { clerkClient } from '@clerk/clerk-sdk-node';

export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify session using clerkClient
    const session = await clerkClient.sessions.verifySession(token);

    if (!session || !session.userId) {
      return res.status(401).json({ message: "Invalid session" });
    }

    // Get user info
    const user = await clerkClient.users.getUser(session.userId);

    const isAdmin = user.privateMetadata?.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Clerk Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
  console.log("Authorization Header:", req.headers.authorization);
};

