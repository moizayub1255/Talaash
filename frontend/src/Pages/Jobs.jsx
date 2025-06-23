import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/get-job`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      setJobs(res.data?.jobs || []); // fallback to [] in case it's undefined
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      setJobs([]); // fallback in case of error
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Headandfoot>
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/demo.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/demo.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/demo.jpeg" className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>

      <div className="available-jobs py-5 px-3">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Jobs</h1>
          <p className="text-muted">Explore the latest job openings</p>
        </div>

        <div className="row g-4">
          {jobs.map((job) => (
            <Link to={`/job-details/${job._id}`} key={job._id}>
              <div>
               <img
  src={job.image || "/default.jpeg"}
  alt="Job"
  width="300"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/default.jpeg";
  }}
/>
              
                <h3>{job.position}</h3>
                <p>{job.company}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Headandfoot>
  );
};

export default Jobs;
