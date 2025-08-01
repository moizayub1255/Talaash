import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
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
      <div className="container-fluid px-4">
        <Link
          className="navbar-brand fw-bold text-success fs-3 me-5 d-flex align-items-center"
          to="/"
        >
          <img
            src="/GREEN (1).gif"
            alt="Logo"
            style={{
              height: "60px",
              width: "120px",
            }}
          />
          {/* <span className="d-none d-sm-block fw-bold fs-5 text-success">TALAASH</span> */}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto gap-3">
            {[
              { path: "/", label: "Home" },
              { path: "/jobs", label: "Jobs" },
              { path: "/scholarship", label: "Scholarships" },
              { path: "/lost-and-found", label: "Lost & Found" },
              { path: "/cv-options", label: "Generate CV" },
              // { path: "/about", label: "About" },
              // { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink to={path} className="nav-link fs-5">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item d-flex align-items-center">
              <SignedOut>
                <button
                  className="btn btn-outline-success me-2"
                  onClick={() => navigate("/sign-in")}
                >
                  SignIn
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/sign-up")}
                >
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
