import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          DBMS
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
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scholarship">
                Scholarships
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lost-and-found">
                Lost and Found
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-2">
              <SignedOut>
                <SignInButton>
                  <button className="btn btn-outline-success btn-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="d-flex align-items-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
