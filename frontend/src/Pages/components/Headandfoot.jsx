import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Headandfoot = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "76vh" , paddingTop:"0px"}}>{children}</main>
      <Footer />
    </div>
  );
};

export default Headandfoot;