import React, { useState } from "react";
import Headandfoot from "./components/Headandfoot";
// import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import

const Login = () => {
  const navigate = useNavigate();

  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default submission
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, // Corrected endpoint
        { email, password }
      );

      // If login successful
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

      
      } else {
        setError(response.data.message); // Show error message
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.error(error);
    }
  };

  return (
    <Headandfoot>
      <div className="register-page">
        <div className="register-container">
          <div className="register-form">
            <h3 className="text-center mb-4">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {/* Display error message */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </div>

              <div className="d-flex justify-content-around gap-3">
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default Login;
