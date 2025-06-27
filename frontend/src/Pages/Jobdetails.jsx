import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [applicant, setApplicant] = useState({ name: "", email: "", phone: "", coverLetter: "" ,cvFile: null,});


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

  const handleApply = async (e) => {
  e.preventDefault();

  if (!applicant.cvFile) {
    alert("Please upload your CV.");
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
          cvFile: base64CV, // ✅ send base64 string
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Your application has been submitted!");
      setShowModal(false);
    } catch {
      alert("Application failed. Try again.");
    }
  };

  reader.readAsDataURL(applicant.cvFile); // ✅ Convert to base64
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
                  <strong>Description:</strong><br />
                  {job.description || "No description provided"}
                </p>
                <p className="text-muted small">
                  <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer bg-white text-end">
                <button className="btn btn-primary my-3" onClick={() => setShowModal(true)}>Apply Now</button>
{showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleApply}>
                  <div className="modal-header">
                    <h5 className="modal-title">Apply for {job.position}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    {["name","email","phone","coverLetter"].map((field) => (
                      <div className="mb-3" key={field}>
                        <label className="form-label">{field === "coverLetter" ? "Cover Letter" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        {field !== "coverLetter" ? (
                          <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            value={applicant[field]}
                            onChange={(e) => setApplicant({ ...applicant, [field]: e.target.value })}
                            className="form-control" required
                          />
                        ) : (
                          <textarea
                            name="coverLetter"
                            value={applicant.coverLetter}
                            onChange={(e) => setApplicant({ ...applicant, coverLetter: e.target.value })}
                            className="form-control" rows="4" required
                          />
                        )}
                      </div>
                    ))}
                  <div className="mb-3">
  <label className="form-label">Upload CV (PDF)</label>
  <input
    type="file"
    accept="application/pdf"
    className="form-control"
    onChange={(e) =>
      setApplicant({ ...applicant, cvFile: e.target.files[0] })
    }
    required
  />
</div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit Application</button>
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
