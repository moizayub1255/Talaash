import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import LostOptions from "./LostOptions";
import Loader from "./components/Loader";

const LostandFound = () => {
  const lostSectionRef = React.useRef(null);
  const [lost, setLosts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const getLosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/get-lost`
        );
        const lostItems = res.data?.losts || [];
        setLosts(lostItems);

        // Fetch images as blobs and convert to data URLs
        const urls = {};
        await Promise.all(
          lostItems.map(async (item) => {
            try {
              const imgRes = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/lost-photo/${item._id}`
              );
              if (imgRes.ok) {
                const blob = await imgRes.blob();
                urls[item._id] = URL.createObjectURL(blob);
              }
            } catch (err) {
              // Ignore image fetch errors
            }
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Failed to fetch losts", error);
        setLosts([]);
      }
    };

    getLosts();
  }, []);

  useEffect(() => {
    // 2 second delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleScrollToLosts = () => {
    if (lostSectionRef.current) {
      lostSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Headandfoot>
      <LostOptions onSearchLost={handleScrollToLosts} />

      <div className="container my-5">
        <h2 className="text-center mb-4">How it Works</h2>
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/about.jpg"
              alt="How it Works"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <p className="fs-5">
              Before listing any Lost or Found Item, our team verifies all the
              details with the concerned institution or organization. This
              ensures authenticity, transparency, and eliminates the risk of
              scams or fake programs.
            </p>
            <p className="fs-6 text-muted">
              We prioritize student safety and aim to provide only the most
              credible and accessible scholarships available nationwide and
              internationally.
            </p>
          </div>
        </div>
      </div>

      <div ref={lostSectionRef} className="available-losts py-5 px-3">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Items</h1>
          <p className="text-muted">Explore the latest items openings</p>
        </div>

        <div className="row g-4">
          {lost.map((lostItem) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={lostItem._id}
            >
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <Link
                  to={`/lost-and-found-details/${lostItem._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={imageUrls[lostItem._id] || "/lostdemo.jpeg"}
                    alt={lostItem.itemName}
                    className="card-img-top rounded-top-4 "
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Item Name: {lostItem.itemName}</h5>
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
                  className="btn btn-success rounded px-4 fw-semibold w-100 h-100"
                  disabled={lostItem.status === "resolved"}
                  onClick={() => {
                    navigate(`/lost-and-found-details/${lostItem._id}`);
                  }}
                >
                  {lostItem.status === "resolved" ? "Item Found" : "Claim Item"}
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
