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
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={job._id}>
              <Link
                to={`/job-details/${job._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                    src="/default.jpeg"
                    alt="Job"
                    className="card-img-top rounded-top-4"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{job.position}</h5>
                    <p className="card-text mb-1">
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Location:</strong> {job.workLocation}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Type:</strong> {job.workType}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Salary:</strong> {job.salary}
                    </p>

                    <p className="card-text text-muted">
                      {job.description?.length > 80
                        ? job.description.slice(0, 80) + "..."
                        : job.description}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 text-end">
                    <button className="btn btn-primary btn-sm rounded-pill">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Headandfoot>
  );
};

export default Jobs;
