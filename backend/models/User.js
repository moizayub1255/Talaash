import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
});

const User = mongoose.model("User", userSchema);
export default User;