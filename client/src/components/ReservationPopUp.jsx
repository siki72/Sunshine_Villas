import React from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReservationPopUp = ({ setopen }) => {
  return (
    <div className="resa-popUp-container">
      <div className="container">
        <h2>
          Thanks <span></span>{" "}
        </h2>
        <div className="first-line">
          <span>
            <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
          </span>
          <span>
            Your booking at <em>sunshine villas</em> is confirmer.
          </span>
        </div>
        <div className="first-line">
          <span>
            <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
          </span>
          <span>
            <em>Sunshine villas</em> all our staff is delighted to receive you :
          </span>
        </div>
        <div className="first-line">
          <span>
            <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
          </span>
          <span>
            Your <em>payement</em> will be handled directly in the reception
          </span>
        </div>

        <button onClick={() => setopen(false)} id="close-btn">
          X
        </button>
      </div>
    </div>
  );
};

export default ReservationPopUp;
