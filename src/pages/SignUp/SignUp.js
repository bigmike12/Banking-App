import React from "react";
import "./SignUp.scss";

const SignUp = () => {
  return (
    <div>
      <h1>Create your Bank account</h1>
      <form>
        <div>
          <label>Enter Your Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Enter Your Email Address</label>
          <input type="email" />
        </div>
        <div>
          <label>Enter Your Password</label>
          <input type="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
