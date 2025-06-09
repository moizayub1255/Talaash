import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
  console.log("REQ.BODY:", req.body);
};



// Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};