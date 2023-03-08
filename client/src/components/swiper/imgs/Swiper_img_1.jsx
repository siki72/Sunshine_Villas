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

const Swiper_img_1 = () => {
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
        <div
          style={{
            backgroundImage: `url(../img/choose_book/1_bed/1.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="main_img"
        ></div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url(../img/choose_book/1_bed/2.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="main_img"
        ></div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url(../img/choose_book/1_bed/3.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="main_img"
        ></div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url(../img/choose_book/1_bed/4.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="main_img"
        ></div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Swiper_img_1;
