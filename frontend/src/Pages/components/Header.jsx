import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { toast } from "react-toastify"; // don't forget this import!

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          Talaash
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/job-options">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scholarship-options">
                Scholarships
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lost-and-found-options">
                Lost and Found
              </Link>
            </li>

            {/* Auth Buttons */}
            <li className="nav-item d-flex align-items-center">
              <SignedOut>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/sign-in")}
                  >
                    SignIn
                  </button>
                </div>
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
