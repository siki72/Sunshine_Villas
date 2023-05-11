import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <div className="success-container">
      <div className="container">
        <h1>Payment successful</h1>
        <h2>Thank you very much for your reservation</h2>
        <div>
          <img src="../../img/logo/sunshine.webp" alt="sunshine villa logo" />
        </div>
        <FontAwesomeIcon className="icon-check" icon={faCircleCheck} />
        <div>
          <Link to="/account/bookings">
            <button className="btn btn-check">Go to my bookings</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
