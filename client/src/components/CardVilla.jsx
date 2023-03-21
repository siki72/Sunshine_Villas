import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

const CardVilla = ({ card }) => {
  return (
    <div className="card-container">
      <Link to={"/villas/" + card.id}>
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
          <div className="guests">
            <span>
              <FontAwesomeIcon className="icons" icon={faUsers} />{" "}
            </span>
            <span> {card.max_guests}</span>
            {""}

            <span className="house">
              <FontAwesomeIcon className="icons" icon={faHouse} />{" "}
            </span>
            <span>{card.area} m2</span>
          </div>
          <div className="card-desc">{card.infos}</div>
        </div>
        <div className="card-booking">
          <span>Click for more info</span>
        </div>
      </Link>
    </div>
  );
};

export default CardVilla;
