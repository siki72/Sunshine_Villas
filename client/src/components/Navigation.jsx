import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVihara } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <div className="navigation">
      <div></div>
      <div></div>
      <div className="logo">
        <FontAwesomeIcon icon={faVihara} />
        <FontAwesomeIcon icon={faVihara} />
        <FontAwesomeIcon icon={faVihara} />
        <div className="line"></div>
        <p>SUNSHINE</p>
        <p>VILLAS</p>
        <p>CODELAND</p>
      </div>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>

        <NavLink to="/about">
          <li>About</li>
        </NavLink>

        <li className="villas">
          Our villas
          <ul className="nav-our-villas">
            <NavLink to="/1-bed-apartement">
              <li>1-bed-apartement</li>
            </NavLink>
            <NavLink to="/2-bed-villa">
              <li>2-bed-villa</li>
            </NavLink>
            <NavLink to="/3-bed-villa">
              <li>3-bed-villa</li>
            </NavLink>
          </ul>
        </li>

        <NavLink to="/contact">
          <li>Contact us</li>
        </NavLink>
        <NavLink to="/booking" className={"book"}>
          <li className="li">BOOKINGS</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
