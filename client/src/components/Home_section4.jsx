import React from "react";
import ReviewsSwiper from "./swiper/reviews/ReviewsSwiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Home_section4 = () => {
  return (
    <div className="section_4">
      <div className="titles_div">
        <h2>"karibu sana zanzibar"</h2>
        <p>-Welcome to Zanzibar</p>
      </div>
      <div className="reviews-grid">
        <ReviewsSwiper />
        <div className="stars">
          <div className="trip-logo">
            <img src="./img/logo/black-logo.png" alt="trip_advisro_logo" />
          </div>
          <div className="stars">
            <img src="./img/logo/stars.png" alt="trip_advisro_logo" />
          </div>
        </div>
      </div>
      <div
        className="get_media"
        style={{
          backgroundImage: `url(./img/home/section_4.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundSize: "cover",
        }}
      >
        <ul>
          <li>
            <h4>#Let's get social</h4>
          </li>
          <li>
            <div>
              <a href="https://www.facebook.com">
                <FontAwesomeIcon className="media-icons" icon={faFacebook} />
              </a>
              <a href="https://www.instagram.com">
                <FontAwesomeIcon className="media-icons" icon={faInstagram} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home_section4;
