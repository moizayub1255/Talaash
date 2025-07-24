import mongoose from "mongoose";

const LostAndFoundSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reporterName: {
      type: String,
      required: true,
    },
    reporterEmail: {
      type: String,
      required: true,
    },
    reporterPhone: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
    postedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LostAndFound", LostAndFoundSchema);
