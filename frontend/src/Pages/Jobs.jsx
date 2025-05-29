import React from "react";
import Headandfoot from "./components/Headandfoot";
import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <Headandfoot>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
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
          {[...Array(6)].map((_, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/demo.jpeg"
                  className="card-img-top"
                  alt="Job Banner"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Job Title {index + 1}</h5>
                  <p className="card-text">
                    A short description about the job role, responsibilities, or
                    company.
                  </p>
                  <Link to="/job-details" className="btn btn-primary mt-auto">
                    Apply Now
                  </Link>
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
