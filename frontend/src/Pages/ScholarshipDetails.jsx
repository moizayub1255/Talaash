import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { isSignedIn, user } = useUser();
  const [scholarship, setScholarship] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    
    phone: "",
    coverLetter: "",
    cvFile: null,
  });

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/scholarship/${id}`
        );
        setScholarship(res.data.scholarship);
      } catch (error) {
        console.error("Error fetching scholarship details:", error);
      }
    };
    fetchScholarship();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!applicant.cvFile) {
      toast.error("Please upload your CV.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64CV = reader.result;

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/apply/${id}`,
          {
            ...applicant,
            cvFile: base64CV,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Your application has been submitted!");
        setShowModal(false);
      } catch {
        toast.error("Application failed. Try again.");
      }
    };

    reader.readAsDataURL(applicant.cvFile);
  };

  if (!scholarship) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Headandfoot>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg rounded-4">
              <img
                src="/demo2.jpeg"
                alt="Scholarship"
                className="card-img-top rounded-top-4"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h2 className="card-title mb-3">{scholarship.title}</h2>
                <p className="card-text mb-2">
                  <strong>Eligibility</strong> {scholarship.eligibility}
                </p>
                <p className="card-text mb-2">
                  <strong>Deadline:</strong> {scholarship.deadline}
                </p>
                <p className="card-text mb-2">
                  <strong>Amount</strong> {scholarship.amount}
                </p>
                <p className="card-text mb-2">
                  <strong>Scholarship Category:</strong> {scholarship.category}
                </p>

                <p className="card-text mb-4">
                  <strong>Description:</strong>
                  <br />
                  {scholarship.description || "No description provided"}
                </p>
                <p className="text-muted small">
                  <strong>Posted on:</strong>{" "}
                  {new Date(scholarship.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer bg-white text-end">
                {/* Delete button only for scholarship poster */}
                {user && scholarship.postedBy === user.id && (
                  <button
                    className="btn btn-danger me-2"
                    onClick={async () => {
                      if (
                        !window.confirm(
                          "Are you sure you want to delete this scholarship?"
                        )
                      )
                        return;
                      try {
                        await axios.delete(
                          `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/delete-scholarship/${scholarship._id}`,
                          {
                            data: { userId: user.id },
                          }
                        );
                        toast.success("Scholarship deleted successfully!");
                        window.location.href = "/scholarship";
                      } catch (err) {
                        toast.error("Failed to delete scholarship");
                      }
                    }}
                  >
                    Delete Scholarship
                  </button>
                )}
                <button
                  className="btn btn-success my-3"
                  disabled={new Date(scholarship.deadline) < new Date()}
                  onClick={() => {
                    if (!isSignedIn) {
                      toast.error("Login to apply for this scholarship.");
                      return;
                    }
                    setShowModal(true);
                  }}
                >
                  Apply Now
                </button>
                {showModal && (
                  <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content shadow-lg border-0 rounded-4">
                        <form onSubmit={handleApply}>
                          <div className="modal-header border-0 pb-0">
                            <h4 className="modal-title fw-bold">
                              Apply for {scholarship.title}
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>

                          <div className="modal-body pt-0">
                            <div className="mt-3 mb-3">
                              {/* <label className="form-label fw-semibold">
                                Name
                              </label> */}
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                value={applicant.name}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    name: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mt-3 mb-3">
                              {/* <label className="form-label fw-semibold">
                                Email
                              </label> */}
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Your Email"
                                value={applicant.email}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    email: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mt-3 mb-3">
                              {/* <label className="form-label fw-semibold">
                                Phone
                              </label> */}
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Phone Number "
                                value={applicant.phone}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    phone: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mt-3 mb-3">
                              {/* <label className="form-label fw-semibold">
                                Cover Letter
                              </label> */}
                              <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Write your cover letter here"
                                value={applicant.coverLetter}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    coverLetter: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label className="form-label fw-semibold text-start d-block">
                                Upload Past Result (PDF)
                              </label>
                              <input
                                type="file"
                                accept="application/pdf"
                                className="form-control"
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    cvFile: e.target.files[0],
                                  })
                                }
                                required
                              />
                            </div>
                          </div>

                          <div className="modal-footer border-0 pt-3">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default ScholarshipDetails;
