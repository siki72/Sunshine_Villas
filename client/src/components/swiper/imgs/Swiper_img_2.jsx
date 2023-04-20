import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../reviews/SwiperStyle.css";
import { useSelector } from "react-redux";

const Swiper_img_2 = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={true}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="main_img">
          <img
            src="../../../img/choose_book/2_bed/1.webp"
            alt="picture 2 bed appartement"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main_img">
          <img
            src="../../img/choose_book/2_bed/2.webp"
            alt="picture 2 bed appartement"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main_img">
          <img
            src="../../img/choose_book/2_bed/3.webp"
            alt="picture 2 bed appartement"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main_img">
          <img
            src="../../img/choose_book/2_bed/4.webp"
            alt="picture 2 bed appartement"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Swiper_img_2;
