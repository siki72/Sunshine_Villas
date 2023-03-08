import React from "react";
/* import "./login.css"; */
const Login = () => {
  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <form className="form " action="" method="POST">
          <div className="input-group success">
            <label htmlFor="email"></label>
            <input type="email" name="email" id="email" />
            <span className="msg">Valid email</span>
          </div>

          <div className="input-group error">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <span className="msg">Incorrect passwordd</span>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
