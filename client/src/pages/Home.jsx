import React from "react";
import { Link } from "react-router-dom";
import Home_section1 from "../components/Home_section1";
import Home_section2 from "../components/Home_section2";
import Home_section3 from "../components/Home_section3";
import Home_section4 from "../components/Home_section4";
import Home_section5 from "../components/Home_section5";

const Home = () => {
  return (
    <div>
      <div className="header">
        <div className="main_img">
          <div>
            <h1>PRIVATE LUXURY VILLAS</h1>
            <h2>Jambiani beach, Zanzibar.</h2>
            <Link to="/villas/1-bed-apartement/1">
              <button className="button">Book your Villa</button>
            </Link>
          </div>
        </div>
      </div>
      <Home_section1 />
      <Home_section2 />
      <Home_section3 />
      <Home_section4 />
      <Home_section5 />
    </div>
  );
};

export default Home;
