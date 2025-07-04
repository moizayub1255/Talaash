import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <SignIn
  path="/sign-in"
  routing="path"
  redirectUrl="/"
/>
    </div>
  );
};

export default SignInPage;
