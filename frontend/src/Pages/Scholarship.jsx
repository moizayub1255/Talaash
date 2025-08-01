import React, { useEffect, useState } from "react";
import Headandfoot from "./components/Headandfoot";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ScholarshipOptions from "./ScholarshipOptions";
import Loader from "./components/Loader";
import {
  FaCalendarAlt,
  FaBookOpen,
  FaMoneyBill,
  FaCheckCircle,
} from "react-icons/fa";

const Scholarship = () => {
  const scholarshipSectionRef = React.useRef(null);
  const [scholarship, setScholarship] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const getScholarship = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/get-scholarship`
        );
        setScholarship(res.data?.scholarships || []);
      } catch (error) {
        console.error("Failed to fetch Scholarship", error);
        setScholarship([]);
      }
    };

    getScholarship();
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

  const handleScrollToScholarships = () => {
    if (scholarshipSectionRef.current) {
      scholarshipSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Headandfoot>
      <ScholarshipOptions onSearchScholarship={handleScrollToScholarships} />
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
              Before listing any scholarship opportunity, our team verifies all
              the details with the concerned institution or organization. This
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

      <div
        ref={scholarshipSectionRef}
        className="available-jobs py-5 px-3 container"
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold">Available Scholarships</h1>
          <p className="text-muted">Explore the latest Scholarships</p>
        </div>

        <div className="row g-4">
          {scholarship.map((sch) => (
            <div className="col-12" key={sch._id}>
              <div className="card shadow-sm border rounded-4 p-3 d-flex flex-row align-items-center justify-content-between flex-wrap">
                {/* Logo / Image */}
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <img
                    src="/demo2.jpeg"
                    alt="Scholarship Logo"
                    className="rounded-3 img-fluid"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h5 className="fw-bold mb-1">{sch.title}</h5>

                    <p className="mb-1 text-muted">
                      <strong>{sch.category}</strong>
                    </p>

                    <div className="d-flex flex-wrap gap-3 text-muted small">
                      <span>
                        <FaCheckCircle className="me-1" /> {sch.eligibility}
                      </span>
                      <span>
                        <FaMoneyBill className="me-1" /> {sch.amount}
                      </span>

                      <span>
                        <FaCalendarAlt className="me-1" /> {sch.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                  <button
                    className="btn btn-success rounded-pill px-4 fw-semibold"
                    disabled={new Date(sch.deadline) < new Date()}
                    onClick={() => {
                      navigate(`/scholarship-details/${sch._id}`);
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

export default Scholarship;
