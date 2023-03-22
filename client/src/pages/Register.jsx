import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import utils from "../users/utilsFunctions";

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const formRegisterRef = useRef();
  const [focused, setFocused] = useState(false);
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
    utils.addUser(formData).then((resp) => {
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="full-screen-container">
      <div className="grid-container">
        <div className="login-container">
          <h1 className="login-title">Welcome</h1>
          <form
            className="form "
            ref={formRegisterRef}
            action="/user/register"
            method="POST"
            onSubmit={registerUser}
          >
            <div className="input-group ">
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
              <span className="msg">
                Username should be 3-16 characters and shouldn't include any
                special character!",
              </span>
            </div>
            <div className="input-group ">
              <input
                placeholder="smith"
                required={true}
                pattern="^[A-Za-z0-9]{3,16}$"
                type="text"
                name="lastname"
                id="lastname"
                onBlur={handleFocus}
                focused={focused.toString()}
              />
              <span className="msg">
                Username should be 3-16 characters and shouldn't include any
                special character!",
              </span>
            </div>
            <div className="input-group ">
              <input
                placeholder="exemple@ex.com"
                type="email"
                name="email"
                id="email"
                required={true}
                onBlur={handleFocus}
                focused={focused.toString()}
              />
              <span className="msg">It should be a valid email address!</span>
            </div>

            <div className="input-group ">
              <input
                placeholder="password"
                required={true}
                pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]{8,20}$"
                type="password"
                name="password"
                id="password"
                onBlur={handleFocus}
                focused={focused.toString()}
              />
              <span className="msg">
                Password should be 8-20 characters and include at least 1
                letter, 1 number and 1 special character!
              </span>
            </div>
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
