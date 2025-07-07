import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import "../Styles/Options.css";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase.js";


const PostAndSearch = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    workLocation: "",
    salary: "",
    workType: "",
    posterEmail: "",

    // phone: "",
  });

  const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
// const [isVerified, setIsVerified] = useState(false);

// const sendOTP = () => {
//   if (!formData.phone.startsWith("+")) {
//     return toast.error("Phone number must start with country code like +92");
//   }

//   // Check and only create recaptcha once
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: (response) => {
//           // reCAPTCHA solved
//         },
//       },
//       auth
//     );
//   }

//   signInWithPhoneNumber(auth, formData.phone, window.recaptchaVerifier)
//     .then((confirmationResult) => {
//       window.confirmationResult = confirmationResult;
//       toast.success("OTP sent successfully");
//     })
//     .catch((error) => {
//       console.error("OTP error:", error);
//       toast.error("Failed to send OTP");
//     });
// };

// const verifyOTP = () => {
//   window.confirmationResult
//     .confirm(otp)
//     .then((result) => {
//       toast.success("Phone number verified ✔");
//       setIsVerified(true);
//     })
//     .catch((error) => {
//       toast.error("Invalid OTP ❌");
//     });
// };


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

  //   if (!isVerified) {
  //   return toast.error("Please verify phone number before posting.");
  // }

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
      // Reset form
      setFormData({
        company: "",
        position: "",
        description: "",
        workLocation: "",
        salary: "",
        workType: "",
        posterEmail: "",
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
              className="btn btn-success btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#postJobModal"
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

      {/* 📋 Modal Form */}
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
                <p className="text-muted text-center">
                  <strong>Note:</strong> Once a job is posted, it cannot be
                  deleted.
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

 {/* <input
  type="text"
  name="phone"
  placeholder="Phone Number (e.g. +92xxxxxxxxxx)"
  value={formData.phone}
  onChange={handleChange}
  className="form-control mb-2"
  required
/>

{isVerified && (
  <div className="text-success mb-2">
    <strong>✔ Phone Verified</strong>
  </div>
)}


<div className="d-flex gap-2 mb-2">
  <button
    type="button"
    className="btn btn-warning w-50"
    onClick={sendOTP}
    disabled={!formData.phone}
  >
    Send OTP
  </button>
  {window.confirmationResult && (
    <button
      type="button"
      className="btn btn-success w-50"
      onClick={() => {
        document.getElementById("otp-section").style.display = "block";
      }}
    >
      Enter OTP
    </button>
  )}
</div>

{/* 🔐 OTP Input - initially hidden */}

{/* <div id="otp-section" style={{ display: "none" }}>
  <input
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    className="form-control mb-2"
  />
  <button type="button" className="btn btn-primary mb-3" onClick={verifyOTP}>
    Verify OTP
  </button>
</div>

<div id="recaptcha-container"></div> * */}


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
