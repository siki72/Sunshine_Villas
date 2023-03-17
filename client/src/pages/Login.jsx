import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { UserContext } from "../users/UserContext.jsx";

const Login = () => {
  const formLoginRef = useRef();
  const [redirect, setRedirect] = useState(false);
  //ramener setUser de notre UserCOntext grace au hook useContext
  const { user, setUser, setReady, ready } = useContext(UserContext);

  const handeleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(formLoginRef.current);
    const tryLoginUser = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await fetch("https://alimissoum.app.3wa.io/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(tryLoginUser),
      });
      if (!response.ok) {
        throw new Error("unable to login");
      } else {
        const user = await response.json();
        setUser(user);
        setReady(true);
        console.log(user);
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Rediriger l'utilisateur vers la page d'accueil s'il est connecté et qu'il accède à la page de connexion
    if (user && location.pathname === "/login") {
      setRedirect(true);
    }
  }, [user, location]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="full-screen-container">
      <div className="grid-container">
        <div className="login-container">
          <h1 className="login-title">Welcome</h1>
          <form
            className="form "
            method="POST"
            ref={formLoginRef}
            onSubmit={handeleLogin}
          >
            <div className="input-group">
              <input
                placeholder="john"
                type="email"
                name="email"
                id="email"
                required={true}
              />
            </div>

            <div className="input-group ">
              <input
                type="password"
                name="password"
                id="password"
                required={true}
                placeholder="password"
              />
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
    </div>
  );
};

export default Login;
