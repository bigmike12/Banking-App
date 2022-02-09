import React from "react";
import "./SignUp.scss";

const SignUp = () => {
  return (
    <div className="signup">
      <h1 className="signup-title2">
        Sign up and get <span>FREE $1000</span>
      </h1>
      <h1 className="signup-title">Create your Bank account</h1>
      <form className="signup-form">
        <div className="signup-name">
          <label>Enter Your Name</label>
          <input type="text" />
        </div>
        <div className="signup-email">
          <label>Enter Your Email Address</label>
          <input type="email" />
        </div>
        <div className="signup-password">
          <label>Enter Your Password</label>
          <input type="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <div className="signup-footer">
        <p>
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
