import mongoose from 'mongoose';

const CvSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  profilePic: String,
  name: String,
  title: String,
  profileSummaryHeading: String,
  profileSummary: String,
  contactHeading: String,
  contact: {
    address: String,
    phone: String,
    email: String,
  },
  keySkillsHeading: String,
  keySkills: [String],
  technicalSkillsHeading: String,
  technicalSkills: [String],
  educationHeading: String,
  education: [
    {
      degree: String,
      year: String,
      institution: String,
    },
  ],
  experienceHeading: String,
  experience: [
    {
      role: String,
      institution: String,
      duration: String,
      description: String,
    },
  ],
  pdfBase64: String, // Store the PDF as a base64 string
}, { timestamps: true });

const CV = mongoose.model('CV', CvSchema);
export default CV;
