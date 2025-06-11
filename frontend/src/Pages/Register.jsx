import React, { useState } from "react";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
        {
          name,
          lastName,
          email,
          password,
          location,
        }
      );


      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message?.includes("Email already registered")
      ) {
        toast.error("Email already registered. Redirecting to login...");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Headandfoot>
      <div className="register-page">
        <div className="register-container">
          <div className="register-form">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Username"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Enter Location"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {/* {error && <div className="text-danger mb-3">{error}</div>} */}

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default Register;
