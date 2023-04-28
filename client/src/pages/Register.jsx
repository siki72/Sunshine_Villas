import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import utils from "../users/utilsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeCircleCheck,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Alert, Modal, Button } from "flowbite-react";
import RegisterModal from "../components/RegisterModal.jsx";
const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const formRegisterRef = useRef();
  const firstNameRef = useRef();
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
        <Modal
          className="backdrop-blur-sm"
          show={showToast}
          onClose={() => setRedirect(true)}
        >
          <Modal.Header className="text-3xl text-center bg-black ">
            <p className="text-white text-center ">Sing up completed</p>
          </Modal.Header>
          <Modal.Body className="bg-withe text-center">
            <div className="space-y-6">
              <FontAwesomeIcon
                icon={faEnvelopeCircleCheck}
                className="text-green-500 text-4xl"
              />

              <p className="text-base leading-relaxed text-black dark:text-gray-400">
                "Congratulations!{" "}
                <span className="text-green-600">
                  {firstNameRef?.current?.value}
                </span>{" "}
                Your registration was successful. To complete the registration
                process, please check your email inbox for a confirmation email
                from us. Click on the confirmation link in the email to verify
                your email address and activate your account."
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-withe flex justify-center">
            <Button color="dark" onClick={() => setRedirect(true)}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>

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
  );
};

export default Register;
