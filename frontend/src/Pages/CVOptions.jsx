import React from "react";
import Headandfoot from "./components/Headandfoot";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CVOptions = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleCustomize = (path) => {
    if (!isSignedIn) {
      toast.error("You must be registered and logged in to customize and download a CV.");
      return;
    }
    navigate(path);
  };

  return (
    <Headandfoot>
      <div className="container my-5">
        <h3 className="text-center mb-4 fw-bold ">
          Select a CV Template to Customize
        </h3>
        <div className="row justify-content-center g-4">
          {/* Template 1 */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm border-0 template-card">
              <img src="/cv1.webp" className="card-img-top" alt="Template 1" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Modern CV</h5>
                <p className="card-text">
                  A clean and modern layout suitable for professionals in
                  creative or tech industries. Easy to customize and visually
                  appealing.
                </p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => handleCustomize("/generate-cv")}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>

          {/* Template 2 */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm border-0 template-card">
              <img src="/cv2.png" className="card-img-top" alt="Template 2" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Professional CV</h5>
                <p className="card-text">
                  A formal, elegant CV design perfect for corporate roles.
                  Highlights your experience and skills in a professional
                  layout.
                </p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => handleCustomize("/generate-cv2")}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default CVOptions;
