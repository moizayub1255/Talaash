import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link } from "react-router-dom";
import axios from "axios";

const LostandFound = () => {
  const [lost, setLosts] = useState([]);

  useEffect(() => {
    const getLosts = async () => {
      try {
        
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/get-lost`);

        

        setLosts(res.data?.losts || []);
      } catch (error) {
        console.error("Failed to fetch losts", error);
        setLosts([]);
      }
    };

    getLosts(); 
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

      <div className="available-losts py-5 px-3">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Items</h1>
          <p className="text-muted">Explore the latest items openings</p>
        </div>

        <div className="row g-4">
          {lost.map((lost) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={lost._id}>
              <Link
                to={`/lost-and-found-details/${lost._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                   src={`${import.meta.env.VITE_BACKEND_URL}${lost.imageUrl}`}
                    alt="Lost"
                    className="card-img-top rounded-top-4"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{lost.position}</h5>
                    <p className="card-text mb-1">
                      <strong>Company:</strong> {lost.company}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Location:</strong> {lost.workLocation}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Type:</strong> {lost.workType}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Salary:</strong> {lost.salary}
                    </p>

                    <p className="card-text text-muted">
                      {lost.description?.length > 80
                        ? lost.description.slice(0, 80) + "..."
                        : lost.description}
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

export default LostandFound;
