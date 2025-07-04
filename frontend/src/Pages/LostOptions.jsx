import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";

const LostOptions = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemType: "",
    description: "",
    location: "",
    date: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    image: null,
    status: "pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePostLost = async (e) => {
    e.preventDefault();

    if (
      !formData.itemName ||
      !formData.itemType ||
      !formData.location ||
      !formData.description ||
      !formData.reporterName ||
      !formData.reporterEmail ||
      !formData.reporterPhone ||
      !formData.image
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      const data = {
        itemName: formData.itemName,
        itemType: formData.itemType,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        reporterName: formData.reporterName,
        reporterEmail: formData.reporterEmail,
        reporterPhone: formData.reporterPhone,
        imageBase64: base64,
        status: formData.status,
      };

      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/create-lost`, data);
        toast.success("Item posted!");
        setFormVisible(false);
        setFormData({
          itemName: "",
          itemType: "",
          description: "",
          location: "",
          date: "",
          reporterName: "",
          reporterEmail: "",
          reporterPhone: "",
          image: null,
          status: "pending",
        });
      } catch (err) {
        console.error("Error posting Lost:", err);
        toast.error("Failed to post Lost.");
      }
    };

    reader.readAsDataURL(formData.image);
  };

  return (
    <Headandfoot>
      <div className="container py-5 text-center">
        <h1 className="mb-4">Welcome to Lost and Found Portal</h1>

        <div className="mb-3">
          <button
            className="btn btn-primary me-3"
            onClick={() => setFormVisible(!formVisible)}
          >
            Post an Item
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/lost-and-found")}
          >
            Search for Items
          </button>
        </div>

        {formVisible && (
          <form onSubmit={handlePostLost} className="mt-4">
            <p>
              <i>
                <strong>Note:</strong> Item once posted can not be deleted
              </i>
            </p>
            <input
              type="text"
              name="itemName"
              placeholder="Item Title"
              value={formData.itemName}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="itemType"
              placeholder="Item Type (e.g. Electronics, Clothing)"
              value={formData.itemType}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. University Campus)"
              value={formData.location}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="text"
              name="reporterName"
              placeholder="Your Name"
              value={formData.reporterName}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <div className="input-group mb-2">
              <span className="input-group-text">+92</span>
              <input
                type="text"
                name="reporterPhone"
                placeholder="3031234567"
                value={formData.reporterPhone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Only digits
                  if (value.length <= 10) {
                    setFormData({ ...formData, reporterPhone: value });
                  }
                }}
                className="form-control"
                maxLength={10}
                required
              />
            </div>

            <textarea
              name="description"
              placeholder="Item Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="email"
              name="reporterEmail"
              placeholder="Your Email"
              value={formData.reporterEmail}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="form-control mb-2"
            />

            <button type="submit" className="btn btn-success">
              Post Item
            </button>
          </form>
        )}
      </div>
    </Headandfoot>
  );
};

export default LostOptions;
