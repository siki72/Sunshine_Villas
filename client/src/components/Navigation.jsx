import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVihara } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const [show, setShow] = useState(true);
  const [lastScrol, setLastScroll] = useState(0);

  const controlNavBar = () => {
    if (window.scrollY > lastScrol) {
      // if scroll down hide the navbar
      setShow(true);
    } else {
      // if scroll up show the navbar
      setShow(false);
    }

    setLastScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);

    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrol]);

  return (
    <div className={`navigation ${show && "hidden"}`}>
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
