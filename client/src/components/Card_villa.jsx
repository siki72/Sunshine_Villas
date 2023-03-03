import React from "react";
import { Link } from "react-router-dom";

const Card_villa = () => {
  return (
    <div className="card-container">
      <div className="villa-pic" style={{ backgroundImage: `(url)` }}></div>
      <div className="card-infos"></div>
      <div className="card-desc"></div>
      <div className="card-booking">
        <Link to="/1-bed-apartement">
          <span>click for more info</span>
        </Link>
      </div>
    </div>
  );
};

export default Card_villa;
