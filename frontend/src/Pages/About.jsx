// src/pages/About.jsx
import React from "react";
import Headandfoot from "./components/Headandfoot";

const About = () => {
  return (
    <Headandfoot>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <img
              src="/about.jpg"
              alt="About Talaash"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="mb-3">
              About <span className="text-success">Talaash</span>
            </h2>
            <p>
              <strong>Talaash</strong> is a purpose-driven platform built to help students across Pakistan
              discover valuable opportunities such as <strong>scholarships</strong>, <strong>internships</strong>, and <strong>jobs</strong>. We understand
              that navigating the professional world can be overwhelming — that’s why Talaash acts as your
              personal career GPS 📍.
            </p>
            <p>
              Whether you're a university student looking for your first internship or a graduate preparing
              for your big break, Talaash is designed to match your ambitions with real-world possibilities.
              Our mission is to empower the youth by bridging the gap between talent and opportunity.
            </p>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">🎓 Curated scholarships from trusted sources</li>
              <li className="list-group-item">💼 Internships & jobs from verified companies</li>
              <li className="list-group-item">🧠 AI-powered suggestions based on your profile</li>
              <li className="list-group-item">📌 Save and track opportunities you’re interested in</li>
              <li className="list-group-item">📬 Get notified when new openings match your goals</li>
            </ul>
            <p>
              Our platform is continuously evolving, based on feedback from students like you. At Talaash,
              we're not just building a website — we're building a movement. So join us, and let your
              journey begin today. 🚀
            </p>
          </div>
        </div>

        <hr className="my-5" />

        <div className="text-center">
          <h3 className="mb-3">Why Choose Talaash?</h3>
          <p className="lead">
            Because we believe every student deserves a chance — not just to dream, but to achieve. 🙌
          </p>
        </div>
      </div>
    </Headandfoot>
  );
};

export default About;
