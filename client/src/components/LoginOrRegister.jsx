import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LoginOrRegister = ({ setError }) => {
  return (
    <div className="error-container">
      <div className="error-message-container">
        <div className="modal-header">
          <div className="redpoint" onClick={() => setError(false)}>
            <FontAwesomeIcon className="xmark-icon" icon={faXmark} />
          </div>
        </div>
        <main>
          <div className="server-stratus"></div>
          <div
            className="message
          "
          >
            <h1>Authentification required </h1>
            <p>
              Dear guest, to book one of our villas directly on our website,
              please click{" "}
              <a href="/login" aria-label="link to login page">
                here
              </a>{" "}
              to Sign in or{" "}
              <a href="/register" aria-label="link to register page">
                here
              </a>{" "}
              to create an account. We look forward to welcoming you soon!
            </p>
          </div>
        </main>
        <div className="close-button" onClick={() => setError(false)}>
          <button className="btn try">Close </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
