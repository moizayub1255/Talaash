import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const SaveClerkUser = () => {
  const { user } = useUser();

  useEffect(() => {
  const saveUserToDB = async () => {
    if (!user) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/clerk-user`, {
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        username: user.username || user.fullName,
        image: user.imageUrl,
      });

      console.log("✅ Clerk user saved:", res.data);
    } catch (err) {
      console.error("❌ Failed to save Clerk user:", err.response?.data || err);
    }
  };

  saveUserToDB();
}, [user]);


  return null;
};

export default SaveClerkUser;
