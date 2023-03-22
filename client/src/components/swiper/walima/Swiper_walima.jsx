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
        <img src="../img/walima/p1.png" alt="food picture" />
      </SwiperSlide>

      <SwiperSlide>
        <img src="../img/walima/p2.png" alt="food picture" />
      </SwiperSlide>

      <SwiperSlide>
        <img src="../img/walima/p3.png" alt="food picture" />
      </SwiperSlide>

      <SwiperSlide>
        <img src="../img/walima/p4.png" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p5.jpg" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p6.jpg" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p7.jpg" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p8.jpg" alt="food picture" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../img/walima/p9.png" alt="food picture" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Swiper_walima;
