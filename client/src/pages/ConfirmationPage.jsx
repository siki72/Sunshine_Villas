import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const ConfirmationPage = () => {
  useEffect(() => {}, []);
  return (
    <div className="confirm-page">
      <div className="page-container">
        <h1>Hakuna matata !</h1>
        <FontAwesomeIcon icon={faFileCircleCheck} className="check-icon" />
        <p>
          Thank you for confirming your email address! We're excited to have you
          as part of our community. Your email address has been successfully
          verified, if you have any questions or concerns, please don't hesitate
          to contact our support team.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
