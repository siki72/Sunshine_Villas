import React from "react";
import ReviewsSwiper from "./swiper/reviews/ReviewsSwiper";

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
            <img src="./img/logo/logo_trip.png" alt="trip_advisro_logo" />
          </div>
          <div className="stars">
            <img src="./img/logo/stars.png" alt="trip_advisro_logo" />
          </div>
        </div>
      </div>
      <div className="get_media">
        <ul>
          <li>
            <a href="www.instagram.com"></a>
          </li>
          <li>
            <a href="www.facebook.com"></a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home_section4;
