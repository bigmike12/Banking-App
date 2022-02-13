import React, { useContext, useState } from "react";
import "./SignUp.scss";
import AuthContext from "context/auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";

const SignUp = (props) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required");
    } else if (password.length < 6) {
      return toast.error("Password must be above six characters");
    } else {
      register({
        name,
        email,
        password,
      });
      toast.success("User registered");
      props.history.push('/');

    }
  };

  return (
    <div className="signup">
      <Toaster />
      <h1 className="signup-title2">
        Sign up and get <span>FREE $1000</span>
      </h1>
      <h1 className="signup-title">Create your Bank account</h1>
      <form className="signup-form" onSubmit={onSubmit}>
        <div className="signup-name">
          <label>Enter Your Name</label>
          <input name="name" onChange={onChange} value={name} type="text" />
        </div>
        <div className="signup-email">
          <label>Enter Your Email Address</label>
          <input name="email" onChange={onChange} value={email} type="email" />
        </div>
        <div className="signup-password">
          <label>Enter Your Password</label>
          <input
            name="password"
            onChange={onChange}
            value={password}
            type="password"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <div className="signup-footer">
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
