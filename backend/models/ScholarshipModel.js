import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    eligibility: { type: String },
    deadline: { type: Date },
    amount: { type: String },
    category: { type: String },
    country: { type: String },
    postedBy: { type: String },
    posterEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", ScholarshipSchema);
