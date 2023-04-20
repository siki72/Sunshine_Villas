import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import utils from "../users/utilsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "flowbite-react";
const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const formRegisterRef = useRef();
  const [focused, setFocused] = useState(false);
  const [invalidField, setInvalidField] = useState(false);
  const [existEmail, setExistEmail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };

  const registerUser = (e) => {
    e.preventDefault();
    const formData = utils.getFormData(formRegisterRef, [
      "firstname",
      "lastname",
      "email",
      "password",
    ]);
    if (formData.password.length < 8 && formData.password.length > 20) {
      setInvalidField(true);
      return;
    }

    utils.addUser(formData).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        setShowToast(true);
      } else if (resp.status === 400) {
        setExistEmail(true);
      }
    });
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="full-screen-container">
      <div className="grid-container">
        {showToast && (
          <Alert color="success" onDismiss={() => setRedirect(true)}>
            <span>
              <span className="font-medium">Info alert!</span> "Congratulations!
              Your registration was successful. You can now go ahead and log in
              to your account."
            </span>
          </Alert>
        )}
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
                placeholder="john"
                required={true}
                pattern="^[A-Za-z0-9]{3,16}$"
                type="text"
                name="firstname"
                id="firstname"
                onBlur={handleFocus}
                focused={focused.toString()}
              />
              <p className="msg">First name should be 3-16 characters</p>
            </div>
            <div className="input-group ">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <label htmlFor="lastname">Last name</label>
              <input
                required={true}
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
                placeholder="exemple@ex.com"
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
  );
};

export default Register;
