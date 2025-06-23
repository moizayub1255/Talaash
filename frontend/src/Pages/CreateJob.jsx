import React, { useState } from "react";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "pending",
    workType: "full-time"
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  const authData = JSON.parse(localStorage.getItem("auth"));
const token = authData?.token;

console.log("Token mil gaya? ", token); // Check again

await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/create-job`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


    alert("Job posted successfully!");
  } catch (error) {
    console.log(error);
    alert("Error posting job.");
  }
};


  return (
    <Headandfoot>
      <div className="container py-5">
        <h2 className="mb-4">Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Company</label>
            <input
              type="text"
              name="company"
              className="form-control"
              onChange={handleChange}
              value={formData.company}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Position</label>
            <input
              type="text"
              name="position"
              className="form-control"
              onChange={handleChange}
              value={formData.position}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Post Job</button>
        </form>
      </div>
    </Headandfoot>
  );
};

export default CreateJob;
