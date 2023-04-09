import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBars,
  faVihara,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../users/UserContext.jsx";

const Navigation = () => {
  const { user } = useContext(UserContext); // je recupére la data de user depuis
  const [show, setShow] = useState(false);
  const [lastScrol, setLastScroll] = useState(0);
  const [hidden, setHidden] = useState(true);
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
  function hamburguerNav() {
    setHidden(!hidden);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);

    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrol]);
  useEffect(() => {
    function ScrollToTop() {
      if (window.scrollY > 200) {
        autoScroll.classList.add("show-scroll-button");
      } else {
        autoScroll.classList.remove("show-scroll-button");
      }
    }
    const autoScroll = document.querySelector(".auto-scroll");
    window.addEventListener("scroll", ScrollToTop);

    return () => {
      window.removeEventListener("scroll", ScrollToTop);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <nav>
      <div className="auto-scroll" onClick={handleScrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} className="scroll-icon" />
      </div>
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
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/explore-zanzibar">Explore Zanzibar</NavLink>
          </li>

          <li className="villas">
            <NavLink to="/villas/1-BED-APARTEMENT/1">Our villas</NavLink>

            <ul className="nav-our-villas">
              <li>
                <NavLink to="/villas/1-BED-APARTEMENT/1">
                  1-bed-apartement
                </NavLink>
              </li>
              <li>
                <NavLink to="/villas/2-BED-VILLA/2">2-bed-villa</NavLink>
              </li>
              <li>
                <NavLink to="/villas/3-BED-VILLA/3">3-bed-villa</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/walima">Walima</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact us</NavLink>
          </li>
          {user?.role === "admin" && (
            <li>
              <NavLink to="/account/dashboard">Dashboard</NavLink>
            </li>
          )}

          <li className="li">
            <NavLink to={user ? "/account" : "/login"} className={"book"}>
              {user ? " Welcome  " + user.name?.toUpperCase() : "Login"}
            </NavLink>
          </li>
        </ul>
      </div>
      <div onClick={() => setHidden(false)} className="hamburguer">
        <span className={hidden ? "ham-white" : "ham-black"}>
          {" "}
          <FontAwesomeIcon icon={faBars} />
        </span>
      </div>
      {!hidden && (
        <div className="hidden-nav">
          <div onClick={hamburguerNav}>
            <FontAwesomeIcon
              className={hidden ? "ham-white" : "ham-black"}
              icon={faX}
            />
          </div>
          <ul onClick={hamburguerNav}>
            <NavLink to="/">
              <li>Home</li>
            </NavLink>

            <NavLink to="/about">
              <li>About</li>
            </NavLink>

            <NavLink to="/villas/1-BED-APARTEMENT/1">
              <li>1-bed-apartement</li>
            </NavLink>
            <NavLink to="/villas/2-BED-VILLA/2">
              <li>2-bed-villa</li>
            </NavLink>
            <NavLink to="/villas/3-BED-VILLA/3">
              <li>3-bed-villa</li>
            </NavLink>

            <NavLink to="/walima">
              <li>Walima</li>
            </NavLink>

            <NavLink to="/contact">
              <li>Contact us</li>
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/account/dashboard">
                <li>Dashboard</li>
              </NavLink>
            )}

            <NavLink to={user ? "/account" : "/login"} className={"book"}>
              <li className="admin-li">
                {user ? " Welcome  " + user.name?.toUpperCase() : "Login"}
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
