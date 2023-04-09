import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../reviews/SwiperStyle.css";

const Swiper_walima = () => {
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
        <img src="../img/walima/p1.webp" alt="food picture" />
      </SwiperSlide>

      <SwiperSlide>
        <img src="../img/walima/p2.webp" alt="food picture" />
      </SwiperSlide>

      {/*      <SwiperSlide>
        <img src="../img/walima/p3.webp" alt="food picture" />
      </SwiperSlide> */}

      <SwiperSlide>
        <img src="../img/walima/p4.webp" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p5.webp" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p6.webp" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p7.webp" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p8.webp" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p9.webp" alt="food picture" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Swiper_walima;
