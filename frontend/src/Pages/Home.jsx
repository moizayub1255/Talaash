import React from "react";
import { useNavigate } from "react-router-dom";
import Headandfoot from "./components/Headandfoot";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Headandfoot>
      <div className="hero-video-container position-relative text-white">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/home.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content container text-center d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-3 fw-bold text-white mb-3">Talaash</h1>
          <h2 className="h4 text-light mb-4">
            Find Opportunities. Reconnect Lives. Build Your Future.
          </h2>
          <p className="lead mb-5 px-3" style={{ maxWidth: "700px" }}>
            Discover jobs, scholarships, and lost items all in one place.
            Talaash helps you connect with what matters most.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              onClick={() => navigate("/jobs")}
              className="btn btn-success btn-lg px-4 btn-glow"
            >
              Find a Job
            </button>
            <button
              onClick={() => navigate("/lost-and-found")}
              className="btn btn-outline-light btn-lg px-4 btn-glow"
            >
              Report Lost Item
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mt-5 d-flex flex-wrap align-items-center">
        <div className="col-md-6 about-glass">
          <h2 className="fw-bold mb-3 text-center">About Talaash</h2>
          <p className="">
            We are a platform built to connect people with opportunities and
            help them recover what they've lost. We provide:
          </p>
          <ul className="list-unstyled ">
            <li className="mb-2 ">
              ✅ Reliable job listings from verified employers
            </li>
            <li className="mb-2">✅ Easy scholarship discovery for students</li>
            <li className="mb-2">
              ✅ A system to report and recover lost items
            </li>
          </ul>
          <p className="">
            So if your are searching for a job, scholarship or your have lost
            some of your valueable item, Then Talaash is the perfect place for
            you.
          </p>
          <button
            className="btn btn-success btn-lg px-4 btn-glow"
            onClick={() => navigate("/about")}
          >
            Read More →
          </button>
        </div>
        <div className="col-md-6 p-4 text-center">
          <img
            src="/homeabout.jpg"
            alt="Our Team"
            className="img-fluid rounded-4 shadow"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="container py-5">
        <div className="row text-center">
          <h2 className="fw-bold mb-4">Explore Our Services</h2>

          {/* Jobs */}
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white shadow rounded-4 h-100 service-card">
              <img
                src="job.jpg"
                alt="Jobs"
                className="img-fluid mb-3 rounded"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <h4>Jobs</h4>
              <p>Find your dream job from verified listings.</p>
              <button
                onClick={() => navigate("/jobs")}
                className="btn btn-success btn-lg px-4 btn-glow"
              >
                Explore Jobs
              </button>
            </div>
          </div>

          {/* Scholarships */}
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white shadow rounded-4 h-100 service-card">
              <img
                src="scholarship.jpg"
                alt="Scholarships"
                className="img-fluid mb-3 rounded"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <h4>Scholarships</h4>
              <p>Get funding for local or abroad studies.</p>
              <button
                onClick={() => navigate("/scholarship")}
                className="btn btn-success btn-lg px-4 btn-glow"
              >
                Find Scholarships
              </button>
            </div>
          </div>

          {/* Lost & Found */}
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white shadow rounded-4 h-100 service-card">
              <img
                src="lost.jpg"
                alt="Lost and Found"
                className="img-fluid mb-3 rounded"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <h4>Lost & Found</h4>
              <p>Report or search for lost items near you.</p>
              <button
                onClick={() => navigate("/lost-and-found")}
                className="btn btn-success btn-lg px-4 btn-glow"
              >
                Search Items
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container py-5 bg-light">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Talaash?</h2>
          <p className="text-muted">
            We are dedicated to connecting the right people with the right
            opportunities and support.
          </p>
        </div>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-white shadow-sm rounded-4">
              <h5>Trust & Safety</h5>
              <p>Verified data ensures safe listings for all users.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-white shadow-sm rounded-4">
              <h5>Fast Support</h5>
              <p>Quick resolution and support for user queries.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-white shadow-sm rounded-4">
              <h5>Community Driven</h5>
              <p>Built for the people, powered by your contributions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team or Features Images Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">The Mind Behind TALAASH</h2>
          <p className="text-muted">Creative mind powering Talaash</p>
        </div>
        <div className="row justify-content-center text-center">
          {/* Team Member 1 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 h-100 shadow">
              <div
                className="mx-auto mt-4"
                style={{
                  width: "250px",
                  height: "250px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/moiz.jpg"
                  alt="Moiz"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="card-body">
                <h5 className="fw-bold">Moiz</h5>
                <p className="text-muted">Full Stack Magician 🧙‍♂️</p>
                <p className="text-secondary fst-italic">
                  Turning coffee into code and bugs into features. Backend,
                  frontend — sab Moiz ke liye ek hi cheez hai.
                </p>
                <div className="d-flex justify-content-center gap-3 fs-5">
                  <i className="bi bi-twitter-x"></i>
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-linkedin"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          {/* <div className="col-md-4 mb-4">
            <div className="card border-0 h-100 shadow">
              <div
                className="mx-auto mt-4"
                style={{
                  width: "250px",
                  height: "250px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/shoaib.jpeg"
                  alt="Shoaib"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="card-body">
                <h5 className="fw-bold">Shoaib</h5>
                <p className="text-muted">Frontend Ninja ⚡</p>
                <p className="text-secondary fst-italic">
                  Pixel-perfect precision aur buttery-smooth UI — Shoaib ka kaam
                  dekhne ke baad Figma bhi pighal jata hai.
                </p>
                <div className="d-flex justify-content-center gap-3 fs-5">
                  <i className="bi bi-twitter-x"></i>
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-linkedin"></i>
                </div>
              </div>
            </div>
          </div> */}

          {/* Team Member 3 */}
          {/* <div className="col-md-4 mb-4">
            <div className="card border-0 h-100 shadow">
              <div
                className="mx-auto mt-4"
                style={{
                  width: "250px",
                  height: "250px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/muneeb.jpeg"
                  alt="Muneeb"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="card-body">
                <h5 className="fw-bold">Muneeb</h5>
                <p className="text-muted">Backend Boss 👑</p>
                <p className="text-secondary fst-italic">
                  Muneeb ne MongoDB se dosti aur APIs se pyar kar liya hai.
                  Server down ho to pehle usse call karna!
                </p>
                <div className="d-flex justify-content-center gap-3 fs-5">
                  <i className="bi bi-twitter-x"></i>
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-instagram"></i>
                  <i className="bi bi-linkedin"></i>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Headandfoot>
  );
};

export default Home;
 