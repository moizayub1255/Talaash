import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div
      style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
    >
      <SignUp path="/sign-up" routing="path" redirectUrl="/" />
    </div>
  );
};

export default SignUpPage;
