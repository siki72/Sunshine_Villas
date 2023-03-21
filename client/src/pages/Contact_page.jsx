import React, { useRef } from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

import Message_form from "../components/Message_form.jsx";
import Staff from "../components/Staff.jsx";

const Contact_page = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>LET US CREATE YOUR DREAM HOLIDAY!</h1>
        <Staff />
      </div>
      <div className="contacts-social">
        <div className="contact-us">
          <h3>Contact us</h3>
          <address>
            <p>MAIN STREET BEACH(sunshine Villas)</p>
            <p> BOX 5412, Zanzibar, Tanzania</p>
          </address>
          <ul>
            <li>TIN: 120-617-400</li>
            <li>VRN: 0700344 I</li>
            <li>ZRB reg. no.: Z025334793</li>
          </ul>
        </div>
        <div className="social">
          <div className="social-media">
            <a href="mailto:admin@admin.com">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <span> admin@admin.com</span>
            </a>
          </div>
          <div className="social-media">
            <FontAwesomeIcon className="icon" icon={faPhone} />{" "}
            <span>+ 255 123 456 789</span>
          </div>
          <div className="social-media">
            <a href="www.instagram.com">
              <FontAwesomeIcon className="icon" icon={faInstagram} />{" "}
              <span>Instagram</span>
            </a>
          </div>
          <div className="social-media">
            <a href="www.facebook.com">
              <FontAwesomeIcon className="icon" icon={faFacebook} />{" "}
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
      <Message_form />
    </div>
  );
};

export default Contact_page;