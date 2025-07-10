import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isSignedIn, user } = useUser();

  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    cvFile: null,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/${id}`
        );
        setJob(res.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJob();
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
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/apply/${id}`,
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
                  <strong>Description:</strong>
                  <br />
                  {job.description || "No description provided"}
                </p>
                <p className="text-muted small">
                  <strong>Posted on:</strong>{" "}
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer bg-white text-end">
                <button
                  className="btn btn-success my-3"
                  onClick={() => {
                    if (!isSignedIn) {
                      toast.error("Login to apply for jobs.");
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
                              Apply for {job.position}
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
                                Upload CV (PDF)
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

export default JobDetails;
