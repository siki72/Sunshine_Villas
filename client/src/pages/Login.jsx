import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import utils from "../users/utilsFunctions.js";
import { UserContext } from "../users/UserContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import RegisterErrorModal from "../components/RegisterErrorModal.jsx";
import PendingPage from "../components/PendingPage.jsx";

const Login = () => {
  const formLoginRef = useRef();
  const [redirectTo, setRedirectTo] = useState(false);
  const [unfoundEmail, setUnfoundEmail] = useState(false);
  const [falsePassword, setFalsePassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const { user, setUser, setReady, setIsAdmin } = useContext(UserContext);

  const handeleLogin = async (e) => {
    setPending(true);
    e.preventDefault();
    const formData = utils.getFormData(formLoginRef, ["email", "password"]);
    try {
      const response = await utils.login(formData);
      if (response.status === 422) {
        setPending(false);
        setFalsePassword(true);
      } else if (response.status === 404) {
        setPending(false);
        setUnfoundEmail(true);
      } else if (response.status === 200) {
        setPending(false);
        const user = await response.json();
        setUser(user);
        if (user.role === "admin") {
          setIsAdmin(user);
        }
        setReady(true);
        setRedirectTo(true);
      }
    } catch (error) {
      setPending(false);
      setError(true);
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_USER}login`,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };
  useEffect(() => {
    if (user && location.pathname === "/login") {
      setRedirectTo(true);
    }
  }, [user, location]);
  if (redirectTo) {
    return <Navigate to={"/"} />;
  }
  return (
    <div
      className="full-screen-container"
      onClick={() => setFalsePassword(false)}
    >
      {pending && <PendingPage />}
      {error && <RegisterErrorModal setError={setError} />}
      <div
        onClick={() => setUnfoundEmail(false)}
        className="grid-container"
        aria-label="plane view of the east coast with beaitfull sunshine"
        role="img"
      >
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

              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required={true} />
            </div>

            <div className="input-group">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required={true}
              />
            </div>
            <span
              className={
                falsePassword || unfoundEmail ? "show-error-msg" : "error-msg"
              }
            >
              {falsePassword && "Wrong password please try again"}
              {unfoundEmail && "email not found please retry or register"}
            </span>
            <button type="submit" className="btn login-button">
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
