import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import utils from "../users/utilsFunctions.js";
import { UserContext } from "../users/UserContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const formLoginRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const [errorLog, setErrorLOg] = useState(false);
  //ramener setUser de notre UserCOntext grace au hook useContext
  const { user, setUser, setReady, setIsAdmin } = useContext(UserContext);

  const handeleLogin = async (e) => {
    e.preventDefault();
    const formData = utils.getFormData(formLoginRef, ["email", "password"]);
    try {
      const response = await utils.login(formData);
      if (!response.ok) {
        setErrorLOg(true);
        setTimeout(() => {
          setErrorLOg(false);
        }, 2500);
        throw new Error("unable to login");
      } else {
        const user = await response.json();
        console.log(user);
        setUser(user);
        if (user.role === "admin") {
          setIsAdmin(user);
        }
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
          <h1 className="login-title">Sign In</h1>
          <form
            className="form "
            method="POST"
            ref={formLoginRef}
            onSubmit={handeleLogin}
          >
            <div className="input-group">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <span class="icon">
                <i class="bx bxs-envelope"></i>
              </span>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required={true} />
            </div>

            <div className="input-group ">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required={true}
              />
            </div>
            <span className={errorLog ? "show-error-msg" : "error-msg"}>
              wrong email or password
            </span>
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
