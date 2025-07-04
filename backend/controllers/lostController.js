import mongoose from "mongoose";
import moment from "moment";
import fs from "fs";
import path from "path";
import LostModel from "../models/LostModel.js";
// ====== CREATE JOB ======
export const createLostController = async (req, res, next) => {
  try {
    const {
      itemName,
      itemType,
      description,
      location,
      date,
      reporterName,
      reporterEmail,
      reporterPhone,
      imageBase64,
      status,
    } = req.body;

    let imageUrl = "";
    if (imageBase64) {
      const base64Data = imageBase64.split("base64,")[1];
      const ext = imageBase64.match(/data:image\/(\w+);base64,/)[1];
      const filename = `${Date.now()}.${ext}`;
      const filepath = path.join("uploads", filename);
      fs.writeFileSync(filepath, base64Data, "base64");
      imageUrl = `/uploads/${filename}`;
    }
    const LostData = {
      itemName,
      itemType,
      description,
      location,
      date,
      reporterName,
      reporterEmail,
      reporterPhone,
      imageUrl,
      status,
    };

    const lost = await LostModel.create(LostData);

    res.status(201).json({ lost });
  } catch (error) {
    console.log("Create Lost Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ======= APPLY JOB ===========

export const applylostController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, coverLetter } = req.body;

  const lost = await LostModel.findById(id);

  if (!lost) return res.status(404).json({ message: "Lost not found" });

  const emailText = `
New Lost Application for: ${lost.location}

Name: ${name}
Email: ${email}
Phone: ${phone}

Cover Letter:
${coverLetter}
  `;

  res.status(200).json({ message: "Application submitted successfully" });
};

// ======= GET JOBS ===========
export const getAllLostController = async (req, res, next) => {
  const { status, category, search, sort } = req.query;

  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (category && category !== "all") {
    queryObject.category = category;
  }
  if (search) {
    queryObject.itemName = { $regex: search, $options: "i" };
  }

  let queryResult = LostModel.find(queryObject);

  if (sort === "latest") queryResult = queryResult.sort("-createdAt");
  if (sort === "oldest") queryResult = queryResult.sort("createdAt");
  if (sort === "a-z") queryResult = queryResult.sort("position");
  if (sort === "z-a") queryResult = queryResult.sort("-position");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  const totallosts = await LostModel.countDocuments(queryObject);
  const numOfPage = Math.ceil(totallosts / limit);

  const losts = await queryResult;

  res.status(200).json({
    totallosts,
    losts,
    numOfPage,
  });
};

export const getSingleLostController = async (req, res) => {
  try {
    const { id } = req.params;

    const lost = await LostModel.findById(id);
    if (!lost) {
      return res.status(404).json({ message: "Lost not found" });
    }

    res.status(200).json({ lost });
  } catch (error) {
    console.error("Error fetching lost:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
