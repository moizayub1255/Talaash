import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";


const PostAndSearch = () => {

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    workLocation: "",
    salary: "",
    workType: "",
    posterEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { getToken } = useAuth(); 
  
const handlePostJob = async (e) => {
  e.preventDefault();

  if (!isSignedIn) {
    toast.error("Please sign in first");
    return;
  }

  try {
    const token = await getToken(); // Clerk token mil gaya
    const data = {
      company: formData.company,
      position: formData.position,
      description: formData.description,
      workLocation: formData.workLocation,
      salary: formData.salary,
      workType: formData.workType || "full-time",
      posterEmail: user?.primaryEmailAddress?.emailAddress,
    };

    await axios.post("http://localhost:5000/api/v1/job/create-job", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Clerk token here!
      },
    });

    toast.success("Job posted!");
    setFormVisible(false);
    setFormData({
      company: "",
      position: "",
      description: "",
      workLocation: "",
      salary: "",
      workType: "",
      posterEmail: "",
    });
  } catch (err) {
    console.error("Error posting job:", err);
    toast.error("Failed to post job.");
  }



    if (!formData.posterEmail || !formData.workType) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!isSignedIn) {
  return (
    <div className="text-center mt-5">
      <h3>Please sign in to access this page.</h3>
    </div>
  );
}

  };

  return (
    <Headandfoot>
      <div className="container py-5 text-center">
        <h1 className="mb-4">Welcome to Job Portal</h1>

        <div className="mb-3">
          <button
            className="btn btn-primary me-3"
            onClick={() => setFormVisible(!formVisible)}
            
          >
            Post a Job
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/jobs")}
            
          >
            Search for Jobs
          </button>
        </div>

        {formVisible && (
          <form onSubmit={handlePostJob} className="mt-4">
            <p>
              <i>
                <strong>Note:</strong> Job once posted can not be deleted
              </i>
            </p>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="workLocation"
              placeholder="Location"
              value={formData.workLocation}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value="">Select Work Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>

            <input
              type="text"
              name="salary"
              placeholder="Salary (e.g. PKR 60,000/month)"
              value={formData.salary}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="email"
              name="posterEmail"
              placeholder="Your Email (where applications will be sent)"
              value={formData.posterEmail}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />

            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <button type="submit" className="btn btn-success">
              Post Job
            </button>
          </form>
        )}
      </div>
    </Headandfoot>
  );
};

export default PostAndSearch;
