import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Footer.css";

const Footer = () => {
  return (
    <div className="main footer-container container-fluid  py-4">
      <div className="row text-md-start">
        {/* Left Section */}
        <div className="col-12 col-md-4 mb-4">
          <img src="/" alt="Talaash" className="img-fluid mb-2" />
          <p>
            We are a team of talented workers. We build modern, responsive
            websites and help you grow online with a strong presence.
          </p>
        </div>

        {/* Middle Section */}
        <div className="col-12 col-md-4 mb-4">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/" className="text-decoration-none text-dark">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-decoration-none text-dark">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-decoration-none text-dark">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/job-options"
                className="text-decoration-none text-dark"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/scholarship-options"
                className="text-decoration-none text-dark"
              >
                Scholarships
              </Link>
            </li>
            <li>
              <Link
                to="/lost-and-found-options"
                className="text-decoration-none text-dark"
              >
                Lost and Found
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="col-12 col-md-4 mb-4">
          <h5>Contact Us</h5>
          <p>
            <strong>Address:</strong> Faisalabad
          </p>
          <p>
            <strong>Email:</strong> moizayub401@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +92 366190190
          </p>
          {/* <p><strong>Follow us:</strong> </p> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
