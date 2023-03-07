import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swiper_img_1 from "../components/swiper/imgs/Swiper_img_1";
import ImgsSwiper from "../components/swiper/imgs/Swiper_img_1";
import Swiper_img_2 from "../components/swiper/imgs/Swiper_img_2";
import Swiper_img_3 from "../components/swiper/imgs/Swiper_img_3";

const Booking = () => {
  const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store
  console.log(data);
  return (
    <div className="booking">
      <div
        style={{
          backgroundImage: `url(./img/home/choose_villas.jpeg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main_img"
      ></div>

      <div className="container">
        <h2>choose your stay</h2>
        <div className="head-div">
          <h3>sunshine villas</h3>
        </div>

        <div className="choose-villas">
          <div className="choose-villa-card">
            <div className="swipe">
              <Swiper_img_1 />
            </div>
            <div className="choose-villa-infos"></div>

            <Link>
              <button>book now </button>
            </Link>
          </div>
          <div className="choose-villa-card">
            <div className="swipe">
              <Swiper_img_2 />
            </div>
            <div className="choose-villa-infos"></div>

            <Link>
              <button>book now </button>
            </Link>
          </div>
          <div className="choose-villa-card">
            <div className="swipe">
              <Swiper_img_3 />
            </div>
            <div className="choose-villa-infos"></div>

            <Link>
              <button>book now </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
