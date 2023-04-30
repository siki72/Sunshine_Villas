import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RegisterErrorModal = ({ setError }) => {
  return (
    <div className="error-container">
      <div className="error-message-container">
        <div className="modal-header">
          <div className="redpoint" onClick={() => setError(false)}>
            <FontAwesomeIcon className="xmark-icon" icon={faXmark} />
          </div>
        </div>
        <main>
          <div className="server-stratus">
            <p>Server Error</p>
            <p>500</p>
          </div>
          <div>
            <h1>Internal Server Error</h1>
            <p>Oops, something went wrong, please try again later</p>
          </div>
        </main>
        <div className="close-button" onClick={() => setError(false)}>
          <button className="btn try">Try again</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterErrorModal;
