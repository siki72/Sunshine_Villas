import React from "react";
import { Link } from "react-router-dom";

const Home_section5 = () => {
  return (
    <div className="section_5">
      <div className="main-section-grid">
        <div
          id="restaurent-img"
          className="walima"
          aria-label="picture of walima restaurent"
          role="img"
        ></div>
        <div className="read" id="restaurent-read">
          <h3>Walima ...</h3>
          <p>
            Our restaurant ‘Walima’ stays with the coastal theme and means
            ‘sail’ in English, inspired by traditional sail boats and echoed in
            the awnings that cover the our buildings. Our restaurant serves
            meals based on fresh ingredients accompanied by a good selection of
            wines and cocktails.
          </p>
          <Link to="/walima">
            <button>Discover our restaurant</button>
          </Link>
        </div>
        <div className="read" id="susta-read">
          <h3>Sustainability</h3>
          <p>
            The Sunshine Villas project is much more than a tourist venture. We
            give top priority to the local community through a variety of social
            and environmental support measures.
          </p>
          <Link to="/about">
            <button>Come and discover us</button>
          </Link>
        </div>
        <div
          className="sansibility"
          id="susta-img"
          aria-label="picture of many chilfrens on the beack"
          role="img"
        ></div>
      </div>
    </div>
  );
};

export default Home_section5;
