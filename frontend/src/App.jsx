import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Jobs from "./Pages/Jobs";
import Scholarship from "./Pages/Scholarship";
import LostandFound from "./Pages/LostandFound";
import Jobdetails from "./Pages/Jobdetails";
import ScrollToTop from "./Pages/components/ScrollToTop";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/lost-and-found" element={<LostandFound />} />
        <Route path="/job-details" element={<Jobdetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
