import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/emailHelper.js";
// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  try {
    const {
      company,
      position,
      status,
      workType,
      description,
      salary,
      posterEmail,
      workLocation,
      createdBy,
      deadline,
      // phone,
    } = req.body;

    const jobData = {
      company,
      position,
      description,
      salary,
      status: status || "pending",
      workType: workType || "full-time",
      posterEmail: posterEmail,
      workLocation,
      deadline,
      createdBy: createdBy || "anonymous",
      // phone,
    };

    const job = await jobsModel.create(jobData);

    res.status(201).json({ job });
  } catch (error) {
    console.log("Create Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ======= APPLY JOB ===========

export const applyJobController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, coverLetter, cvFile } = req.body;

  const job = await jobsModel.findById(id);

  if (!job.posterEmail) {
    console.log("🚨 No posterEmail for job:", job._id);
    return res
      .status(400)
      .json({ message: "Job poster email missing, cannot send application" });
  }

  if (!job) return res.status(404).json({ message: "Job not found" });

  const emailText = `
New Job Application for: ${job.position}

Name: ${name}
Email: ${email}
Phone: ${phone}

Cover Letter:
${coverLetter}
  `;

  // ✅ Attachment as base64
  const attachments = [];

  if (cvFile) {
    attachments.push({
      filename: `${name.replace(/ /g, "_")}_CV.pdf`,
      content: cvFile.split("base64,")[1], // Remove prefix
      encoding: "base64",
    });
  }

  await sendEmail(
    job.posterEmail,
    `Application for ${job.position}`,
    emailText,
    attachments
  );

  res.status(200).json({ message: "Application submitted successfully" });
};

// ======= GET JOBS ===========
export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;

  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  if (sort === "latest") queryResult = queryResult.sort("-createdAt");
  if (sort === "oldest") queryResult = queryResult.sort("createdAt");
  if (sort === "a-z") queryResult = queryResult.sort("position");
  if (sort === "z-a") queryResult = queryResult.sort("-position");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  const totalJobs = await jobsModel.countDocuments(queryObject);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  });
};

// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

// ======= DELETE JOBS ===========
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // For demo: get userId from request body (or req.user.userId if using auth)
  const userId = req.body.userId || (req.user && req.user.userId);
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    return res.status(404).json({ message: `No Job Found With This ID ${id}` });
  }
  if (!userId || userId !== job.createdBy) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this job" });
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

// =======  JOBS STATS & FILTERS ===========
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
};

export const getJobByIdController = async (req, res) => {
  const job = await jobsModel.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.status(200).json({ job });
};
