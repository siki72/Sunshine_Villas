import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSection1 from "../components/HomeSection1";
import HomeSection2 from "../components/HomeSection2";
import HomeSection3 from "../components/HomeSection3";
import HomeSection4 from "../components/HomeSection4";
import HomeSection5 from "../components/HomeSection5";

const Home = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header className="header">
        <div
          className="main_img"
          aria-label="plane view of sunhine villas"
          role="img"
        >
          <div>
            <h1 style={{ transform: `translateX(-${scrollY}px)` }}>
              PRIVATE LUXURY VILLAS
            </h1>
            <h2 style={{ transform: `translateX(${scrollY}px)` }}>
              Jambiani beach, Zanzibar.
            </h2>
            <Link to="/villas/1-bed-apartement/1">
              <button className="button">Book your Villa</button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <HomeSection5 />
      </main>
    </>
  );
};

export default Home;
