import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVihara } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../users/UserContext.jsx";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [lastScrol, setLastScroll] = useState(0);
  const { user } = useContext(UserContext); // je recupére la data de user depuis
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
    <div className={`navigation  ${show ? "scroll-down" : "scroll-up"} `}>
      <div></div>
      <div></div>

      <Link to={"/"} className="logo">
        <div>
          <FontAwesomeIcon icon={faVihara} />
          <FontAwesomeIcon icon={faVihara} />
          <FontAwesomeIcon icon={faVihara} />
          <div className="line"></div>
          <p>SUNSHINE</p>
          <p>VILLAS</p>
          <p>CODELAND</p>
        </div>
      </Link>

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
            <NavLink to="/villas/1">
              <li>1-bed-apartement</li>
            </NavLink>
            <NavLink to="/villas/2">
              <li>2-bed-villa</li>
            </NavLink>
            <NavLink to="/villas/3">
              <li>3-bed-villa</li>
            </NavLink>
          </ul>
        </li>

        <NavLink to="/contact">
          <li>Contact us</li>
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/account/dashboard">
            <li>Dashboard</li>
          </NavLink>
        )}

        <NavLink to={user ? "/account" : "/login"} className={"book"}>
          <li className="li">
            {user ? " Welcome  " + user.name?.toUpperCase() : "Login"}
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
