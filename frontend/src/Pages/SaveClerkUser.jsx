import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const SaveClerkUser = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUserToDB = async () => {
      if (user) {
        await axios.post("http://localhost:5000/api/auth/clerk-user", {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username || user.fullName,
          image: user.imageUrl,
        });
      }
    };

    saveUserToDB();
  }, [user]);

  return null;
};

export default SaveClerkUser;
