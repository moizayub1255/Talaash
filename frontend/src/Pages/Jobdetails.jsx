import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/${id}`);
        setJob(res.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Headandfoot>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg rounded-4">
              <img
                src="/default.jpeg"
                alt="Job"
                className="card-img-top rounded-top-4"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h2 className="card-title mb-3">{job.position}</h2>
                <p className="card-text mb-2">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="card-text mb-2">
                  <strong>Salary:</strong> {job.salary || "Not specified"}
                </p>
                <p className="card-text mb-2">
                  <strong>Location:</strong> {job.workLocation}
                </p>
                <p className="card-text mb-2">
                  <strong>Job Type:</strong> {job.workType}
                </p>
                <p className="card-text mb-2">
                  <strong>Status:</strong> {job.status}
                </p>
                <p className="card-text mb-4">
                  <strong>Description:</strong><br />
                  {job.description || "No description provided"}
                </p>
                <p className="text-muted small">
                  <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer bg-white text-end">
                <button className="btn btn-primary rounded-pill">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default JobDetails;
