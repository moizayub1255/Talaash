import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Jobs from './Pages/Jobs';
import Scholarship from './Pages/Scholarship';
import LostandFound from './Pages/LostandFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/lost-and-found" element={<LostandFound />} />
      </Routes>
    </Router>
  )
}

export default App