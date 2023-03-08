import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <form className="form " action="/register" method="POST">
          <div className="input-group ">
            <label htmlFor="firstname">First name</label>
            <input type="text" name="firstname" id="firstname" />
            <span className="msg">Valid email</span>
          </div>
          <div className="input-group ">
            <label htmlFor="lastname">Last name</label>
            <input type="text" name="lastname" id="lastname" />
            <span className="msg">Valid email</span>
          </div>
          <div className="input-group ">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <span className="msg">Valid email</span>
          </div>

          <div className="input-group ">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <span className="msg">Incorrect passwordd</span>
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          <div className="need-register">
            Already a member ? <Link to={"/login"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
