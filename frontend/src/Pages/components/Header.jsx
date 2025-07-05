import React from "react";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import "../../Styles/Header.css"; 

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">
          TALAASH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/job-options" className="nav-link">Jobs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/scholarship-options" className="nav-link">Scholarships</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/lost-and-found-options" className="nav-link">Lost & Found</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </li>
            <li className="nav-item d-flex align-items-center">
              <SignedOut>
                <button className="btn btn-outline-success me-2" onClick={() => navigate("/sign-in")}>
                  SignIn
                </button>
                <button className="btn btn-success" onClick={() => navigate("/sign-up")}>
                  SignUp
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
