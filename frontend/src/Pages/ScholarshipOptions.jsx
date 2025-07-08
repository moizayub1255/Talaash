import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import "../Styles/Options.css";

const ScholarshipOptions = () => {
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
    } = formData;

    if (
      !title ||
      !description ||
      !eligibility ||
      !deadline ||
      !amount ||
      !category ||
      !country ||
      !postedBy ||
      !posterEmail
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/create-scholarship`,
        { ...formData }
      );

      toast.success("Scholarship posted!");
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

      // Close modal
      const modalEl = document.getElementById("scholarshipModal");
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } catch (err) {
      console.error("Error posting scholarship:", err);
      toast.error("Failed to post scholarship.");
    }
  };

  return (
    <>
      {/* 🎥 Hero Section */}
      <div className="hero-video-container position-relative text-white">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/scholarship.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold text-white">
            Discover Scholarships <br /> That Shape Your Future
          </h1>
          <p className="lead mb-4">
            Explore opportunities to fund your education and achieve your academic goals — locally and globally.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-success btn-lg px-4 btn-glow"
              data-bs-toggle="modal"
              data-bs-target="#scholarshipModal"
            >
              Post a Scholarship
            </button>
            <button
              onClick={() => navigate("/scholarship")}
              className="btn btn-outline-light btn-lg px-4 btn-glow"
            >
              Search Scholarships
            </button>
          </div>
        </div>
      </div>

      {/* 🧾 Modal Form */}
      <div
        className="modal fade"
        id="scholarshipModal"
        tabIndex="-1"
        aria-labelledby="scholarshipModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handlePostScholarship}>
              <div className="modal-header">
                <h5 className="modal-title" id="scholarshipModalLabel">
                  Post a Scholarship
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted text-center">
                  <strong>Note:</strong> Once posted, scholarships cannot be deleted.
                </p>

                <input
                  type="text"
                  name="title"
                  placeholder="Scholarship Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="eligibility"
                  placeholder="Eligibility Criteria"
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="amount"
                  placeholder="Amount (e.g. PKR 50,000)"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category (e.g. Education, Research)"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country (e.g. Pakistan)"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="text"
                  name="postedBy"
                  placeholder="Posted By (Name)"
                  value={formData.postedBy}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="email"
                  name="posterEmail"
                  placeholder="Poster Email"
                  value={formData.posterEmail}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Scholarship Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control mb-3"
                  rows="4"
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Post Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipOptions;
