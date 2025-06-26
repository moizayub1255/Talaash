import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Companay name is require"],
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    description: { type: String },


    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract","remote"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Lahore",
      required: [true, "Work location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    salary: {
  type: String,
  required: [true, "Salary is required"],
},
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
