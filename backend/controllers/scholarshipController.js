// ======= DELETE SCHOLARSHIP ===========
export const deleteScholarshipController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.body.userId;
  const scholarship = await ScholarshipModel.findOne({ _id: id });
  if (!scholarship) {
    return res
      .status(404)
      .json({ message: `No Scholarship Found With This ID ${id}` });
  }
  if (!userId || userId !== scholarship.postedBy) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this scholarship" });
  }
  await scholarship.deleteOne();
  res.status(200).json({ message: "Success, Scholarship Deleted!" });
};

import { sendEmail } from "../utils/emailHelper.js";
import ScholarshipModel from "../models/ScholarshipModel.js";
// ====== CREATE JOB ======
export const createScholarshipController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      eligibility,
      deadline,
      amount,
      category,
      country,
      postedBy,
      posterEmail,
    } = req.body;

    const ScholarshipData = {
      title,
      description,
      eligibility,
      deadline,
      amount,
      category,
      country,
      postedBy,
      posterEmail,
    };

    const scholarship = await ScholarshipModel.create(ScholarshipData);

    res.status(201).json({ scholarship });
  } catch (error) {
    console.log("Create Scholarship Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ======= APPLY JOB ===========

export const applyScholarshipController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, coverLetter, cvFile } = req.body;

  const scholarship = await ScholarshipModel.findById(id);

  if (!scholarship.posterEmail) {
    console.log("🚨 No posterEmail for Scholarship:", scholarship._id);
    return res
      .status(400)
      .json({
        message: "Scholarship poster email missing, cannot send application",
      });
  }

  if (!scholarship)
    return res.status(404).json({ message: "Scholarship not found" });

  const emailText = `
New Scholarship Application for: ${scholarship.category}

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
    scholarship.posterEmail,
    `Application for ${scholarship.category}`,
    emailText,
    attachments
  );

  res.status(200).json({ message: "Application submitted successfully" });
};

export const getAllScholarshipController = async (req, res, next) => {
  const { status, category, search, sort } = req.query;

  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (category && category !== "all") {
    queryObject.category = category;
  }
  if (search) {
    queryObject.amount = { $regex: search, $options: "i" };
  }

  let queryResult = ScholarshipModel.find(queryObject);

  // Default sort by latest created
  if (!sort || sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  } else if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  } else if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  } else if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  const totalscholarships = await ScholarshipModel.countDocuments(queryObject);
  const numOfPage = Math.ceil(totalscholarships / limit);

  const scholarships = await queryResult;

  res.status(200).json({
    totalscholarships,
    scholarships,
    numOfPage,
  });
};

export const getSingleScholarshipController = async (req, res) => {
  try {
    const { id } = req.params;

    const scholarship = await ScholarshipModel.findById(id);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }

    res.status(200).json({ scholarship });
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
