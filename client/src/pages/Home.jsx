import React from "react";
import { Link } from "react-router-dom";
import Home_section1 from "../components/Home_section1";
import Home_section2 from "../components/Home_section2";
import Home_section3 from "../components/Home_section3";
import Home_section4 from "../components/Home_section4";

const Home = () => {
  return (
    <div>
      <div className="header">
        <div
          style={{
            backgroundImage: `url(./img/home/zanzibar.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="main_img"
        >
          <div>
            <h1>
              PRIVATE <br /> LUXURY VILLAS
            </h1>
            <h2>Jambiani beach, Zanzibar.</h2>
            <Link to="/booking">
              <button className="button">Book your Villa</button>
            </Link>
          </div>
        </div>
      </div>
      <Home_section1 />
      <Home_section2 />
      <Home_section3 />
      <Home_section4 />
    </div>
  );
};

export default Home;
