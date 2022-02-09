import React from "react";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="login">
      <h1 className="login-title">Welcome Back</h1>

      <div className="login-footer">
        <p>
          New to Banking? <span>Sign up</span>
        </p>
      </div>

      <form className="login-form">
        <div className="login-email">
          <input type="email" placeholder="Your Email Address" />
        </div>
        <div className="login-password">
          <input type="password" placeholder="Your Password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
