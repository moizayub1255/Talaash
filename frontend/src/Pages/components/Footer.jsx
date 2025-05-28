import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <>
        <div className="main d-flex justify-content-between align-items-center">
            <div className="left">
                <img src="/" alt="DBMS" />
                <p>We are a team of talented workers We are a team of talented workersWe are a team of talented workersWe are a team of talented workersWe are a team of talented workersWe are a team of talented workersWe are a team of talented workersWe are a team of talented workers</p>
            </div>
            <div className="middle">
                <ul className="list-unstyled">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/jobs">Jobs</Link>
                    </li>
                    <li>
                        <Link to="/scholarship">Scholarships</Link>
                    </li>
                    <li>
                        <Link to="/lost-and-found">LostandFound</Link>
                    </li>
                </ul>
            </div>
            <div className="right">
                <h3>Contact US</h3>
                <p><strong>Adress:</strong> 1234 Street Name, City, State, Zip</p>
                <p><strong>Email:</strong>moizayub401@gmail.com </p>
                <p><strong>Phone:</strong> +1 234 567 890</p>
                <p><strong>Follow us:</strong></p>
            </div>
        </div>
    </>
  );
};

export default Footer;
