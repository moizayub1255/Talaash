import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";

const PostAndSearch = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    image: "",
    workLocation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handlePostJob = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append("company", formData.company);
    data.append("position", formData.position);
    data.append("description", formData.description);
    data.append("location", formData.workLocation);
    data.append("image", formData.image); // file append

    await axios.post("http://localhost:5000/api/v1/job/create-job", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if needed
      },
    });

    toast.success("Job posted!");
    setFormVisible(false);
    setFormData({
      company: "",
      position: "",
      description: "",
      image: "",
      workLocation: "",
    });
  } catch (err) {
    console.error("Error posting job:", err);
    toast.error("Failed to post job.");
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
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="form-control mb-3"
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
