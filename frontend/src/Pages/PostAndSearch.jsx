import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import "../Styles/Options.css";
import { useAuth, useUser } from "@clerk/clerk-react";

const PostAndSearch = ({ onSearchJob }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    workLocation: "",
    salary: "",
    workType: "",
    posterEmail: "",
    deadline: "",
  });

  const [latestDeadline, setLatestDeadline] = useState(null);

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Fetch latest job deadline to validate new postings
    const fetchLatestDeadline = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/get-job`
        );
        const jobs = res.data?.jobs || [];
        if (jobs.length > 0) {
          // Find the latest deadline among jobs
          const deadlines = jobs
            .map((job) => job.deadline)
            .filter(Boolean)
            .map((d) => new Date(d));
          if (deadlines.length > 0) {
            const maxDeadline = new Date(Math.max(...deadlines));
            setLatestDeadline(maxDeadline);
          }
        }
      } catch (err) {
        console.error("Error fetching latest job deadline", err);
      }
    };
    fetchLatestDeadline();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    // Check login
    if (!isSignedIn) {
      toast.error("Login to post the Job");
      return;
    }

    // Form validation
    if (
      !formData.posterEmail ||
      !formData.company ||
      !formData.position ||
      !formData.description ||
      !formData.workLocation ||
      !formData.salary ||
      !formData.workType ||
      !formData.deadline
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate deadline is not before today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(formData.deadline) < today) {
      toast.error("Deadline cannot be in the past.");
      return;
    }

    // Validate deadline is not before latestDeadline
    if (latestDeadline && new Date(formData.deadline) < latestDeadline) {
      toast.error(
        `Deadline cannot be before the latest posted job deadline: ${latestDeadline.toLocaleDateString()}`
      );
      return;
    }

    try {
      const token = await getToken();

      const data = {
        ...formData,
        workType: formData.workType || "full-time",
        createdBy: user?.id || "anonymous",
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/create-job`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job posted successfully!");

      // Reset form
      setFormData({
        company: "",
        position: "",
        description: "",
        workLocation: "",
        salary: "",
        workType: "",
        posterEmail: "",
        deadline: "",
      });

      // Close modal
      const modalEl = document.getElementById("postJobModal");
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Failed to post job.");
    }
  };

  return (
    <>
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
            Discover top startup jobs tailored just for you. Find your dream
            role, grow your career, and join innovative teams making a
            difference.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-success btn-lg px-4 btn-glow"
              onClick={() => {
                if (!isSignedIn) {
                  toast.error("Login to Post the Job");
                  return;
                }

                const modal = new window.bootstrap.Modal(
                  document.getElementById("postJobModal")
                );
                modal.show();
              }}
            >
              Post A Job
            </button>

            {/* ✅ Search A Job Button */}
            <button
              className="btn btn-outline-light btn-lg px-4 btn-glow"
              onClick={() => {
                if (onSearchJob) {
                  onSearchJob();
                }
              }}
            >
              Search A Job
            </button>
          </div>
        </div>
      </div>

      {/* 💼 Modal Form */}
      <div
        className="modal fade"
        id="postJobModal"
        tabIndex="-1"
        aria-labelledby="postJobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="postJobModalLabel">
                Post a Job
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handlePostJob}>
              <div className="modal-body">
                {/* Form Fields */}
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
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  type="email"
                  name="posterEmail"
                  placeholder="Your Email"
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
                  placeholder="Job Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="form-control mb-3"
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
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostAndSearch;
