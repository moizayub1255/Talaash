import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link } from "react-router-dom";
import axios from "axios";
import ScholarshipOptions from "./ScholarshipOptions";

const Scholarship = () => {
  const [scholarship, setScholarship] = useState([]);

  useEffect(() => {
    const getScholarship = async () => {
      try {
        
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/get-scholarship`);

        

        setScholarship(res.data?.scholarships || []);
      } catch (error) {
        console.error("Failed to fetch Scholarship", error);
        setScholarship([]);
      }
    };

    getScholarship(); 
  }, []);

  return (
    <Headandfoot>
      <ScholarshipOptions/>

      <div className="available-jobs py-5 px-3">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Scholarships</h1>
          <p className="text-muted">Explore the latest Scholarships</p>
        </div>

        <div className="row g-4">
          {scholarship.map(sch => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={sch._id}>
              <Link
                to={`/scholarship-details/${sch._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                    src="/demo2.jpeg"
                    alt="Scholarship"
                    className="card-img-top rounded-top-4"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{sch.title}</h5>
                    <p className="card-text mb-1">
                      <strong>Eligibility:</strong> {sch.eligibility}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Deadline:</strong> {sch.deadline}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Amount:</strong> {sch.amount}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Category:</strong> {sch.category}
                    </p>

                    <p className="card-text text-muted">
                      {sch.description?.length > 80
                        ? sch.description.slice(0, 80) + "..."
                        : sch.description}
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

export default Scholarship;
