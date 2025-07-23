import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link } from "react-router-dom";
import axios from "axios";
import PostAndSearch from "./PostAndSearch";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBill,
  FaCalendarAlt,
  FaHeart,
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/get-job`
        );
        setJobs(res.data?.jobs || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setJobs([]);
      }
    };

    getJobs();
  }, []);

  // Ref for available jobs section
  const jobsSectionRef = React.useRef(null);

  const handleScrollToJobs = () => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Headandfoot>
      <PostAndSearch onSearchJob={handleScrollToJobs} />

      <div ref={jobsSectionRef} className="available-jobs py-5 px-3 container">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Jobs</h1>
          <p className="text-muted">Explore the latest job openings</p>
        </div>

        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-12" key={job._id}>
              <div className="card shadow-sm border rounded-4 p-3 d-flex flex-row align-items-center justify-content-between flex-wrap">
                {/* Logo / Image */}
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <img
                    src="/default.jpeg"
                    alt="Company Logo"
                    className="rounded-3 img-fluid"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h5 className="fw-bold mb-1">{job.position}</h5>

                    <p className="mb-1 text-muted">
                      <strong>{job.company}</strong>
                    </p>

                    <div className="d-flex flex-wrap gap-3 text-muted small">
                      <span>
                        <FaMapMarkerAlt className="me-1" /> {job.workLocation}
                      </span>
                      <span>
                        <FaClock className="me-1" /> {job.workType}
                      </span>
                      <span>
                        <FaMoneyBill className="me-1" /> {job.salary}
                      </span>
                      <span>
                        <FaCalendarAlt className="me-1" /> Date Line: 01 Jan,
                        2045
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                  <button
                    className="btn btn-success rounded-pill px-4 fw-semibold"
                    onClick={() => {
                      navigate(`/job-details/${job._id}`);
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Headandfoot>
  );
};

export default Jobs;
