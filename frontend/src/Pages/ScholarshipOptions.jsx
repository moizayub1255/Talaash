import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import "../Styles/Options.css";

const ScholarshipOptions = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibility: "",
    deadline: "",
    amount: "",
    category: "",
    country: "",
    postedBy: "",
    posterEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostScholarship = async (e) => {
    e.preventDefault();

    // ✅ Validation First
    if (
      !formData.posterEmail ||
      !formData.postedBy ||
      !formData.title ||
      !formData.description ||
      !formData.eligibility ||
      !formData.deadline ||
      !formData.amount ||
      !formData.category ||
      !formData.country
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const data = {
        ...formData,
        postedBy: formData.postedBy || "Anonymous",
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/create-scholarship`,
        data
      );

      toast.success("Scholarship posted!");
      setFormVisible(false);
      setFormData({
        title: "",
        description: "",
        eligibility: "",
        deadline: "",
        amount: "",
        category: "",
        country: "",
        postedBy: "",
        posterEmail: "",
      });
    } catch (err) {
      console.error("Error posting scholarship:", err);
      toast.error("Failed to post scholarship.");
    }
  };

  return (
    <Headandfoot>
      {/* 🎥 Hero Section with Background Video */}
      <div className="hero-video-container position-relative text-white">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/scholarship.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay" />

        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold text-white">
            Discover Scholarships<br /> That Shape Your Future
          </h1>
          <p className="lead mb-4">
            Explore opportunities to fund your education and achieve your academic goals — locally and globally.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => setFormVisible(true)}
              className="btn btn-success btn-lg"
            >
              Post a Scholarship
            </button>
            <button
              onClick={() => navigate("/scholarship")}
              className="btn btn-primary btn-lg"
            >
              Search Scholarships
            </button>
          </div>
        </div>
      </div>

      {/* 📄 Form Section */}
      <div className="container py-5">
        {formVisible && (
          <form
            onSubmit={handlePostScholarship}
            className="bg-light p-4 rounded shadow"
          >
            <div className="text-end mb-3">
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={() => setFormVisible(false)}
              >
                Cancel
              </button>
            </div>

            <p className="text-muted text-center">
              <strong>Note:</strong> Once a scholarship is posted, it cannot be deleted.
            </p>

            <input
              type="text"
              name="title"
              placeholder="Scholarship Title"
              value={formData.title}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="eligibility"
              placeholder="Eligibility Criteria"
              value={formData.eligibility}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount (e.g. PKR 50,000)"
              value={formData.amount}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Education, Research)"
              value={formData.category}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country (e.g. Pakistan)"
              value={formData.country}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="postedBy"
              placeholder="Posted By (Name)"
              value={formData.postedBy}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="email"
              name="posterEmail"
              placeholder="Poster Email"
              value={formData.posterEmail}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="description"
              placeholder="Scholarship Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="form-control mb-3"
            />

            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">
                Post Scholarship
              </button>
            </div>
          </form>
        )}
      </div>
    </Headandfoot>
  );
};

export default ScholarshipOptions;
