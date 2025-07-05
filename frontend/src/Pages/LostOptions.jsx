import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import "../Styles/Options.css";

const LostOptions = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemType: "",
    description: "",
    location: "",
    date: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    image: null,
    status: "pending",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePostLost = async (e) => {
    e.preventDefault();

    const {
      itemName,
      itemType,
      location,
      description,
      reporterName,
      reporterEmail,
      reporterPhone,
      image,
    } = formData;

    if (
      !itemName ||
      !itemType ||
      !location ||
      !description ||
      !reporterName ||
      !reporterEmail ||
      !reporterPhone ||
      !image
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      const data = {
        ...formData,
        imageBase64: base64,
      };

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/create-lost`,
          data
        );

        toast.success("Item posted!");
        setFormVisible(false);
        setPreviewImage(null);
        setFormData({
          itemName: "",
          itemType: "",
          description: "",
          location: "",
          date: "",
          reporterName: "",
          reporterEmail: "",
          reporterPhone: "",
          image: null,
          status: "pending",
        });
      } catch (err) {
        console.error("Error posting Lost:", err);
        toast.error("Failed to post Lost item.");
      }
    };

    reader.readAsDataURL(image);
  };

  return (
    <Headandfoot>
      {/* 🎥 Hero Section */}
      <div className="hero-video-container position-relative text-white">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/lost.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold text-white">
            Lost Something? <br /> Report It Here
          </h1>
          <p className="lead mb-4">
            Help us reconnect people with their lost items. Post a lost item or
            search through found listings.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => setFormVisible(true)}
              className="btn btn-success btn-lg"
            >
              Post An Item
            </button>
            <button
              onClick={() => navigate("/lost-and-found")}
              className="btn btn-primary btn-lg"
            >
              Search Lost Items
            </button>
          </div>
        </div>
      </div>

      {/* 📋 Form Section */}
      <div className="container py-5">
        {formVisible && (
          <form
            onSubmit={handlePostLost}
            className="bg-light p-4 rounded shadow"
          >
            <div className="text-end mb-3">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setFormVisible(false);
                  setPreviewImage(null);
                }}
              >
                Cancel
              </button>
            </div>

            <p className="text-muted text-center">
              <strong>Note:</strong> Once posted, items cannot be deleted.
            </p>

            <input
              type="text"
              name="itemName"
              placeholder="Item Title"
              value={formData.itemName}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              name="itemType"
              placeholder="Item Type (e.g. Electronics, Clothing)"
              value={formData.itemType}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. University Campus)"
              value={formData.location}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              name="reporterName"
              placeholder="Your Name"
              value={formData.reporterName}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <div className="input-group mb-2">
              <span className="input-group-text">+92</span>
              <input
                type="text"
                name="reporterPhone"
                placeholder="3031234567"
                value={formData.reporterPhone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setFormData({ ...formData, reporterPhone: value });
                  }
                }}
                className="form-control"
                maxLength={10}
                required
              />
            </div>
            <input
              type="email"
              name="reporterEmail"
              placeholder="Your Email"
              value={formData.reporterEmail}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="description"
              placeholder="Item Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="form-control mb-2"
              required
            />

            {previewImage && (
              <div className="text-center mb-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            )}

            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">
                Post Item
              </button>
            </div>
          </form>
        )}
      </div>
    </Headandfoot>
  );
};

export default LostOptions;
