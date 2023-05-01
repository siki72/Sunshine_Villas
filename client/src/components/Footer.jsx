import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faVihara } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex">
        <div className="hotel-logo">
          <div className="logo-footer">
            <FontAwesomeIcon icon={faVihara} />
            <FontAwesomeIcon icon={faVihara} />
            <FontAwesomeIcon icon={faVihara} />
            <div className="lin"></div>
            <p>SUNSHINE</p>
            <p>VILLAS</p>
            <p>CODELAND</p>
          </div>
          <div className="Stars">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="phone">
            <p>+255 123 456 789</p>
            <p>bookings@sunshine-villas.com</p>
          </div>
        </div>
        <div className="trip-logo">
          <div className="trip-logo-img">
            <img
              src="../../img/logo/trip-footer-logo.webp"
              alt="logo of sunshine villas"
            />
          </div>
          <p>Connect With Us</p>
          <p>SOCIAL MEDIA CHANNELS</p>
          <div className="socials-medias">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com"
                  aria-label="follow us on facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  aria-label="follow us on instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  aria-label="follow us on twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="accommodation">
          <h3>accommodation</h3>

          <ul className="nav-our-villasours-villas">
            <li>
              <Link to="/1-bed-apartement">1-bed-apartement</Link>
            </li>
            <li>
              <Link to="/2-bed-villa">2-bed-villa</Link>
            </li>
            <li>
              <Link to="/3-bed-villa">3-bed-villa</Link>
            </li>
          </ul>
        </div>
        <div className="get-in-touche">
          <h3>get in touch</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about"> About</Link>
            </li>

            <li>
              <Link to="/explore-zanzibar">Explore</Link>
            </li>

            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="rights">
        <h4>ALL RIGHTS RESERVED SUNSHNE VILLAS 2023</h4>
        <h4>FINAL PROJECT FOR 3W ACADEMY BY ALI MISSOUM</h4>
      </div>
    </footer>
  );
};

export default Footer;
