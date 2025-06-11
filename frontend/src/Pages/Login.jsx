import React, { useState } from "react";
import Headandfoot from "./components/Headandfoot";
// import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Headandfoot>
      <div className="register-page">
        <div className="register-container">
          <div className="register-form">
            <h3 className="text-center mb-4">Login</h3>
            {/* Display error message */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
