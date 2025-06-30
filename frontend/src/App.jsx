import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Jobs from "./Pages/Jobs";
import Scholarship from "./Pages/Scholarship";
import LostandFound from "./Pages/LostandFound";
import ScrollToTop from "./Pages/components/ScrollToTop";
import PostAndSearch from "./Pages/PostAndSearch";
import JobDetails from "./Pages/Jobdetails";
import ScholarshipOptions from "./Pages/ScholarshipOptions";
import ScholarshipDetails from "./Pages/ScholarshipDetails";

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
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/job-options" element={<PostAndSearch />} />
        <Route path="/scholarship-options" element={<ScholarshipOptions />} />
        <Route path="/scholarship-details/:id" element={<ScholarshipDetails />} />
        
      </Routes>
    </Router>
  );
};

export default App;
