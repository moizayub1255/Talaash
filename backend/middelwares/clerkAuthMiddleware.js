
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";



export const requireAuth = ClerkExpressRequireAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});
