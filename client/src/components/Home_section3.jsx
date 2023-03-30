import React from "react";
import { Link } from "react-router-dom";

const Home_section3 = () => {
  return (
    <div className="section_3">
      <div className="section_3_grid">
        <div className="img"></div>
        <div className="text">
          <h2>Discover Zanzibar</h2>
          <p>
            The hotel’s location makes it a perfect base to explore all the
            activities that Zanzibar has to offer. There’s something for
            everybody, from watersport lessons to wildlife tours and day trips
            to the island’s most iconic sights. These are just some of the
            amazing things on offer, check out the list below to find out more.
          </p>
          <div className="explore-tours">
            <Link to="/explore-zanzibar">
              <button>Our offred tours</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_section3;
