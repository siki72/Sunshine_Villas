import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import utils from "../users/utilsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import RegisterModal from "../components/RegisterModal.jsx";
import RegisterErrorModal from "../components/RegisterErrorModal.jsx";
import PendingPage from "../components/PendingPage.jsx";
const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const formRegisterRef = useRef();
  const firstNameRef = useRef();
  const [focused, setFocused] = useState(false);
  const [invalidField, setInvalidField] = useState(false);
  const [existEmail, setExistEmail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };

  const registerUser = async (e) => {
    setPending(true);
    e.preventDefault();
    const formData = utils.getFormData(formRegisterRef, [
      "firstname",
      "lastname",
      "email",
      "password",
    ]);
    if (formData.password.length < 8 && formData.password.length > 20) {
      setPending(false);
      setInvalidField(true);
      return;
    }
    try {
      const resp = await utils.addUser(formData);
      if (resp.status === 200) {
        setPending(false);
        setShowToast(true);
      } else if (resp.status === 400) {
        setPending(false);
        setExistEmail(true);
      } else {
        throw new Error("unable to register");
      }
    } catch (error) {
      setPending(false);
      setError(true);
      const errorDatas = {
        url: import.meta.env.VITE_URL_USER,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {pending && <PendingPage />}
      <div className="full-screen-container">
        {error && <RegisterErrorModal setError={setError} />}
        <div className="grid-container">
          <RegisterModal
            setRedirect={setRedirect}
            showToast={showToast}
            firstNameRef={firstNameRef}
          />
          <div className="login-container">
            <h1
              className={existEmail ? "error-email login-title" : "login-title"}
            >
              {existEmail ? "email already registered please login" : "Welcome"}
            </h1>
            <form
              className="form "
              ref={formRegisterRef}
              action="/user/register"
              method="POST"
              onSubmit={registerUser}
              onClick={() => setExistEmail(false)}
            >
              <div className="input-group ">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <label htmlFor="firstname">First name</label>
                <input
                  placeholder="your first name"
                  required={true}
                  pattern="^[A-Za-z0-9]{3,16}$"
                  type="text"
                  name="firstname"
                  id="firstname"
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  ref={firstNameRef}
                />
                <p className="msg">First name should be 3-16 characters</p>
              </div>
              <div className="input-group ">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <label htmlFor="lastname">Last name</label>
                <input
                  required={true}
                  placeholder="your last name"
                  pattern="^[A-Za-z0-9]{3,16}$"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <p className="msg">Last name should be 3-16 characters</p>
              </div>
              <div className="input-group ">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
                <label htmlFor="email">Email</label>
                <input
                  placeholder="exemple@email.com"
                  type="email"
                  name="email"
                  id="email"
                  required={true}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <p className="msg">Please enter a valid email</p>
              </div>

              <div className="input-group ">
                <FontAwesomeIcon className="icon" icon={faLock} />
                <label htmlFor="passsword">Password</label>
                <input
                  placeholder="password"
                  required={true}
                  type="password"
                  name="password"
                  id="password"
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <p className="msg">Last name should be 3-16 characters</p>
              </div>
              <p className={invalidField ? "invalidField msg" : "msg"}>
                Password should be 8-20 characters!
              </p>
              <button type="submit" className="login-button">
                Register
              </button>
              <div className="need-register">
                Already a member ? <Link to={"/login"}>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
