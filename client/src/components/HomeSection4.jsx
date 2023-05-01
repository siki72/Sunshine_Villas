import React from "react";
import ReviewsSwiper from "./swiper/reviews/ReviewsSwiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const HomeSection4 = () => {
  return (
    <section className="section_4">
      <div className="titles_div">
        <h2>"karibu sana zanzibar"</h2>
        <p>-Welcome to Zanzibar</p>
      </div>
      <div className="reviews-grid">
        <ReviewsSwiper />
        <div className="stars">
          <div className="trip-logo">
            <img src="./img/logo/black-logo.webp" alt="trip_advisro_logo" />
          </div>
          <div className="stars">
            <img src="./img/logo/stars.webp" alt="trip_advisro_logo" />
          </div>
        </div>
      </div>
      <div className="get_media">
        <ul>
          <li>
            <h3>#Let's get social</h3>
          </li>
          <li>
            <div>
              <a
                href="https://www.facebook.com"
                aria-label="follow us on facebook"
              >
                <FontAwesomeIcon className="media-icons" icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="follow us on instagram"
              >
                <FontAwesomeIcon className="media-icons" icon={faInstagram} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomeSection4;
