import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";

const ScholarshipOptions = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibility: "",
    deadline: "",
    amount: "",
    category: "",
    country: "",
    postedBy: "",
    posterEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostScholarship = async (e) => {
    e.preventDefault();

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        eligibility: formData.eligibility,
        deadline: formData.deadline,
        amount: formData.amount,
        category: formData.category,
        country: formData.country,
        postedBy: formData.postedBy || "Anonymous",
        posterEmail: formData.posterEmail,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/scholarship/create-scholarship`,
        data,
        {}
      );

      toast.success("Scholarship posted!");
      setFormVisible(false);
      setFormData({
        title: "",
        description: "",
        eligibility: "",
        deadline: "",
        amount: "",
        category: "",
        country: "",
        postedBy: "",
        posterEmail: "",
      });
    } catch (err) {
      console.error("Error posting Scholarship:", err);
      toast.error("Failed to post Scholarship.");
    }

    if (
      !formData.posterEmail ||
      !formData.postedBy ||
      !formData.title ||
      !formData.description ||
      !formData.eligibility ||
      !formData.deadline ||
      !formData.amount ||
      !formData.category ||
      !formData.country
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
  };

  return (
    <Headandfoot>
      <div className="container py-5 text-center">
        <h1 className="mb-4">Welcome to Scholarship Portal</h1>

        <div className="mb-3">
          <button
            className="btn btn-primary me-3"
            onClick={() => setFormVisible(!formVisible)}
          >
            Post a Scholarship
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/scholarship")}
          >
            Search for Scholarships
          </button>
        </div>

        {formVisible && (
          <form onSubmit={handlePostScholarship} className="mt-4">
            <p>
              <i>
                <strong>Note:</strong> Scholarship once posted can not be
                deleted
              </i>
            </p>
            <input
              type="text"
              name="title"
              placeholder="Scholarship Title"
              value={formData.title}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="eligibility"
              placeholder="Eligibility Criteria"
              value={formData.eligibility}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount (e.g. PKR 50,000)"
              value={formData.amount}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Education, Research)"
              value={formData.category}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="text"
              name="country"
              placeholder="Country (e.g. Pakistan)"
              value={formData.country}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="postedBy"
              placeholder="Posted By"
              value={formData.postedBy}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              name="posterEmail"
              type="email"
              placeholder="Poster Email"
              value={formData.posterEmail}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="date"
              name="deadline"
              placeholder="Application Deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-control mb-2"
              required
            />

            <textarea
              name="description"
              placeholder="Scholarship Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <button type="submit" className="btn btn-success">
              Post Scholarship
            </button>
          </form>
        )}
      </div>
    </Headandfoot>
  );
};

export default ScholarshipOptions;
