import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "../../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-md-left">
        <div className="row text-md-start">
          {/* Company */}
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold  color">
              Company
            </h5>
            <p>
              <Link className="text-white text-decoration-none" to="/about">
                About Us
              </Link>
            </p>
            <p>
              <Link className="text-white text-decoration-none" to="/contact">
                Contact Us
              </Link>
            </p>
            <p>
              <Link className="text-white text-decoration-none" to="#">
                Our Services
              </Link>
            </p>
            <p>
              <Link className="text-white text-decoration-none" to="#">
                Privacy Policy
              </Link>
            </p>
            <p>
              <Link className="text-white text-decoration-none" to="#">
                Terms & Condition
              </Link>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold color">
              Quick Links
            </h5>
            <p>
              <Link className="text-white text-decoration-none" to="/">
                Home
              </Link>
            </p>
            <p>
              <Link className="text-white text-decoration-none" to="/jobs">
                Jobs
              </Link>
            </p>
            <p>
              <Link
                className="text-white text-decoration-none"
                to="/scholarship"
              >
                Scholarships
              </Link>
            </p>
            <p>
              <Link
                className="text-white text-decoration-none"
                to="/lost-and-found"
              >
                Lost & Found
              </Link>
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold color">
              Contact
            </h5>
            <p>
              <FaMapMarkerAlt className="me-2" />
              Main Jaranwala Road, Faisalabad
            </p>
            <p>
              <FaPhoneAlt className="me-2" />
              +92 305 8666266
            </p>

            <p>
              <FaEnvelope className="me-2" />
              moizayub402@gmail.com
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="#">
                <FaTwitter className="text-white" />
              </a>
              <a href="#">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#">
                <FaYoutube className="text-white" />
              </a>
              <a href="#">
                <FaLinkedinIn className="text-white" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4 ">
            <h5 className="text-uppercase mb-4 font-weight-bold  color">
              Newsletter
            </h5>
            <p>Subscribe to our newsletter to get our latest notifications</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
              />
              <button className="btn btn-success">SignUp</button>
            </div>
          </div>
        </div>

        <hr className="mb-4" />
        <div className="row">
          <div className="col-md-8">
            <p>
              ©{" "}
              <Link to="/" className="text-success text-decoration-none">
                talaash
              </Link>
              , All Right Reserved. Developed and Designed By{" "}
              <span className="text-success">Moiz and co.</span>
            </p>
          </div>
          <div className="col-md-4 d-flex justify-content-md-end gap-4">
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
            <Link to="#" className="text-white text-decoration-none">
              Cookies
            </Link>
            <Link to="#" className="text-white text-decoration-none">
              Help
            </Link>
            <Link to="#" className="text-white text-decoration-none">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
