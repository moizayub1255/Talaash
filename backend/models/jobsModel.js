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
    image: { type: String, default: "https://www.google.com/imgres?q=job%20img&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2019%2F01%2F19%2F19%2F22%2Frecruitment-3942378_640.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fillustrations%2Frecruitment-opportunity-employment-3942378%2F&docid=f5QDX1wn9S_UwM&tbnid=N8V0ZgovmmrS5M&vet=12ahUKEwjbruW_gIiOAxXA2wIHHYElMa8QM3oECGYQAA..i&w=640&h=371&hcb=2&ved=2ahUKEwjbruW_gIiOAxXA2wIHHYElMa8QM3oECGYQAA" },

    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
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
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
