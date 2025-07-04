import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;