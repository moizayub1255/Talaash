import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import "../Styles/Options.css";

const PostAndSearch = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    workLocation: "",
    salary: "",
    workType: "",
    posterEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    if (
      !formData.posterEmail ||
      !formData.company ||
      !formData.position ||
      !formData.description ||
      !formData.workLocation ||
      !formData.salary ||
      !formData.workType
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const data = {
        ...formData,
        workType: formData.workType || "full-time",
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/create-job`,
        data
      );

      toast.success("Job posted!");
      setFormVisible(false);
      setFormData({
        company: "",
        position: "",
        description: "",
        workLocation: "",
        salary: "",
        workType: "",
        posterEmail: "",
      });
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Failed to post job.");
    }
  };

  return (
    <Headandfoot>
      {/* 🎥 Hero Section */}
      <div className="hero-video-container position-relative text-white">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/job.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold text-white">
            Find The Best Startup <br /> Job That Fits You
          </h1>
          <p className="lead mb-4">
            Discover top startup jobs tailored just for you. Find your dream role, grow your career, and join innovative teams making a difference.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => setFormVisible(true)}
              className="btn btn-success btn-lg"
            >
              Post A Job
            </button>
            <button
              onClick={() => navigate("/jobs")}
              className="btn btn-primary btn-lg"
            >
              Search A Job
            </button>
          </div>
        </div>
      </div>

      {/* 📄 Form Section */}
      <div className="container py-5">
        {formVisible && (
          <form
            onSubmit={handlePostJob}
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
              <strong>Note:</strong> Once a job is posted, it cannot be deleted.
            </p>

            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              name="workLocation"
              placeholder="Location"
              value={formData.workLocation}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="form-control mb-2"
              required
            >
              <option value="">Select Work Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
            <input
              type="text"
              name="salary"
              placeholder="Salary (e.g. PKR 60,000/month)"
              value={formData.salary}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <input
              type="email"
              name="posterEmail"
              placeholder="Your Email (for applications)"
              value={formData.posterEmail}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="form-control mb-3"
              required
            />

            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">
                Post Job
              </button>
            </div>
          </form>
        )}
      </div>
    </Headandfoot>
  );
};

export default PostAndSearch;
