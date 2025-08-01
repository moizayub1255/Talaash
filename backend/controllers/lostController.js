// ======= DELETE LOST ITEM ===========
export const deleteLostController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.body.userId;
  const lost = await LostModel.findOne({ _id: id });
  if (!lost) {
    return res
      .status(404)
      .json({ message: `No Lost Item Found With This ID ${id}` });
  }
  if (!userId || userId !== lost.postedBy) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this lost item" });
  }
  await lost.deleteOne();
  res.status(200).json({ message: "Success, Lost Item Deleted!" });
};
import mongoose from "mongoose";
import moment from "moment";
import fs from "fs";
import path from "path";
import LostModel from "../models/LostModel.js";
// ====== CREATE JOB ======
// controllers/lostController.js

export const createLostController = async (req, res) => {
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
      status,
    } = req.body;

    // Validate required fields
    if (
      !itemName ||
      !itemType ||
      !description ||
      !location ||
      !reporterName ||
      !reporterEmail ||
      !reporterPhone
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    if (req.file) {
      console.log(
        "Image uploaded:",
        req.file.originalname,
        "size:",
        req.file.size,
        "type:",
        req.file.mimetype
      );
    } else {
      console.log("No image uploaded");
    }

    const lostItem = new LostModel({
      itemName,
      itemType,
      description,
      location,
      date,
      reporterName,
      reporterEmail,
      reporterPhone,
      status: status || "pending",
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
      postedBy: req.body.postedBy || "anonymous",
    });

    await lostItem.save();

    res.status(201).json({
      success: true,
      message: "Lost item posted successfully",
      lostItem,
    });
  } catch (error) {
    console.error("❌ Error creating lost item:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const LostPhotoController = async (req, res) => {
  try {
    const lost = await LostModel.findById(req.params.id).select("image");
    if (lost && lost.image && lost.image.data) {
      res.setHeader("Content-Type", lost.image.contentType);
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).end(Buffer.from(lost.image.data));
    } else {
      return res.status(404).send("Image not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
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

// ======= UPDATE LOST ITEM STATUS ===========
export const updateLostStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lost = await LostModel.findById(id);
    if (!lost) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    lost.status = status || lost.status;
    await lost.save();

    res.status(200).json({ message: "Lost item status updated", lost });
  } catch (error) {
    console.error("Error updating lost item status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
