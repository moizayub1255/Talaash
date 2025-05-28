// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // jab route change ho, top pe scroll karo
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
