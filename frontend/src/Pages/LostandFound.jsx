import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import LostOptions from "./LostOptions";

const LostandFound = () => {
  const [lost, setLosts] = useState([]);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const getLosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/get-lost`
        );
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
      <LostOptions />

      <div className="available-losts py-5 px-3">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Items</h1>
          <p className="text-muted">Explore the latest items openings</p>
        </div>

        <div className="row g-4">
          {lost.map((lostItem) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={lostItem._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <Link
                  to={`/lost-and-found-details/${lostItem._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${lostItem.imageUrl}`}
                    alt="Lost"
                    className="card-img-top rounded-top-4"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{lostItem.itemName}</h5>
                    <p className="card-text mb-1">
                      <strong>Type:</strong> {lostItem.itemType}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Location:</strong> {lostItem.location}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Founder Name:</strong> {lostItem.reporterName}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Founder Phone:</strong> {lostItem.reporterPhone}
                    </p>
                    <p className="card-text text-muted">
                      <strong>Description:</strong>{" "}
                      {lostItem.description?.length > 80
                        ? lostItem.description.slice(0, 80) + "..."
                        : lostItem.description}
                    </p>
                  </div>
                </Link>

                <div className="card-footer bg-white border-0 text-end">
                  <button
                    className="btn btn-success rounded-pill px-4 fw-semibold"
                    onClick={() => {
                      if (!isSignedIn) {
                        toast.error("Login to claim the item");
                        return;
                      }
                      navigate(`/lost-and-found-details/${lostItem._id}`);
                    }}
                  >
                    Claim Item
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

export default LostandFound;
