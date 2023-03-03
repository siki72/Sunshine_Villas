import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

const CardVilla = ({ card }) => {
  return (
    <div className="card-container">
      <div
        className="villa-pic"
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "cover",
          height: "600px",
        }}
      ></div>
      <div className="card-infos">
        <p>{card.name}</p>
        <FontAwesomeIcon icon={faUsers} /> {card.max_guests}{" "}
        <FontAwesomeIcon icon={faHouse} /> {card.area} m2
      </div>
      <div className="card-desc"></div>
      <div className="card-booking">
        <Link to={card.link}>
          <span>click for more info</span>
        </Link>
      </div>
    </div>
  );
};

export default CardVilla;
