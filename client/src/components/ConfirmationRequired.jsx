import React, { useRef, useState } from "react";
import utils from "../users/utilsFunctions.js";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmationRequired = ({ user, setError }) => {
  const [pending, setPending] = useState(false);
  const responseRef = useRef();
  const sendEmail = async () => {
    try {
      setPending(true);
      const response = await fetch(import.meta.env.VITE_URL_USER_EMAIL, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json ; charset=UTF-8",
        },
      });
      if (response.status === 204) {
        responseRef.current.className = " visible";
      }
    } catch (error) {
      const errorDatas = {
        url: import.meta.env.VITE_URL_USER_EMAIL,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };
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
          <div className="message">
            <h1>Please confirm your email address</h1>
            <p>
              Dear <span>{user.name.toUpperCase()}</span>, thank you to enter
              the code you received by email in your customer area .
            </p>
            <button className="btn email" onClick={sendEmail}>
              Resend email confirmation ?
            </button>
            <p ref={responseRef} className="email-success">
              Email was sent successfully
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

export default ConfirmationRequired;
