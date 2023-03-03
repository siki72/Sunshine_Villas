import React from "react";
import { Link } from "react-router-dom";
import Home_section1 from "../components/Home_section1";
import Home_section2 from "../components/Home_section2";
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
    </div>
  );
};

export default Home;
