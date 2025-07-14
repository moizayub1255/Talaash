// src/pages/Contact.jsx
import React, { useState } from "react";
import Headandfoot from "./components/Headandfoot";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with YOUR WhatsApp number (without + or spaces)
    const phoneNumber = "923058666266";

    const message = `Hi Moiz,%0AI'm ${formData.name}%0AMy email is ${formData.email}%0A${formData.message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Redirect user to WhatsApp
    window.open(whatsappURL, "_blank");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Headandfoot>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mb-4 text-center">
              Contact <span className="text-success">Talaash</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Send via WhatsApp 📲
              </button>
            </form>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default Contact;
