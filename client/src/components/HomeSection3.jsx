import React from "react";
import { Link } from "react-router-dom";

const HomeSection3 = () => {
  return (
    <section className="section_3">
      <div className="section_3_grid">
        <div
          className="img"
          aria-label="picture of old wood boat in the sea"
          role="img"
        ></div>
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
    </section>
  );
};

export default HomeSection3;
