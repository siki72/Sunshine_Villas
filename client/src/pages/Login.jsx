import React, { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import userApi from "../users/api";
import { UserContext } from "../users/UserContext.jsx";
const Login = () => {
  const formLoginRef = useRef();
  const [redirect, setRedirect] = useState(false);

  //ramener setUser de notre UserCOntext grace au hook useContext
  const { setUser } = useContext(UserContext);

  const handeleLogin = (e) => {
    e.preventDefault();
    try {
      const data = new FormData(formLoginRef.current);
      const tryLoginUser = {
        email: data.get("email"),
        password: data.get("password"),
      };

      /*   userApi.login(tryLoginUser).then((resp) => setUser(resp)); // passer les infos de user depuis node à notre UserCOntext */

      fetch("https://alimissoum.app.3wa.io/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          /*         "Access-Control-Allow-Credentials": true, */
        },
        body: JSON.stringify(tryLoginUser),
      })
        .then((resp) => resp.json())
        .then((data) => setUser(data));
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <form
          className="form "
          action="/login"
          method="POST"
          ref={formLoginRef}
          onSubmit={handeleLogin}
        >
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
          <div className="need-register">
            Don't have an account yet ? <Link to={"/register"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
