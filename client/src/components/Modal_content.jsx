import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Modal_content = ({ user, closeModal }) => {
  return (
    <div className="container">
      <h2>
        Thanks <span>{user.name}</span>{" "}
      </h2>
      <div className="first-line">
        <span>
          <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
        </span>
        <p>
          Your booking at <em>sunshine villas</em> is confirmer.
        </p>
      </div>
      <div className="first-line">
        <span>
          <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
        </span>
        <p>
          <em>Sunshine villas</em> all our staff is delighted to receive you !
        </p>
      </div>
      <div className="first-line">
        <span>
          <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
        </span>
        <p>
          Your <em>payement</em> will be handled directly in the reception
        </p>
        <button onClick={closeModal} id="close-btn">
          X
        </button>
      </div>
    </div>
  );
};

export default Modal_content;
