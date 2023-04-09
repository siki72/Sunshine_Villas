import React from "react";
import { Link } from "react-router-dom";
const Home_section1 = () => {
  return (
    <div className="section_1">
      <div className="main-villa">
        <div className="text">
          <h2>
            Our Villas are found on one of most beautiful stretches of beach on
            the east coast of Zanzibar
          </h2>
          <p>
            The South-East coast is famous for its white sandy beaches and
            turquoise waters of the Indian Ocean. Away from the hustle and
            bustle, the village of Sunshine, rooted in local tradition, is the
            perfect destination for those seeking harmony, peace, and
            tranquillity in a delightfully picturesque environment.
          </p>
          <p>
            Sunhsine Villas was created from the combination of our great love
            for local African culture and hospitality of the highest quality.
            That is why we can fully guarantee a perfect vacation full of
            harmony, peace, and the beauty of Zanzibar. Karibu Sana
          </p>
          <div className="link-villas">
            <div className="check-div">
              <span className="check">Check Availability</span>
            </div>
            <Link to="/booking" className="button">
              <span>BOOKINGS</span>
            </Link>
          </div>
        </div>
        <div
          className="section_1_img"
          aria-label="picture of villa 1 and the swiming-pool"
          role="img"
        ></div>
      </div>
    </div>
  );
};

export default Home_section1;
