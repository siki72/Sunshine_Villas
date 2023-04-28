import React from "react";
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
        <div className="main_img swipe1">
          <img
            src="../../img/choose_book/1-BED-APARTEMENT/1.webp"
            alt="picture 1 bed appartement"
            title="Cliquez ici pour voir plus de photos"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main_img swipe1">
          <img
            src="../../img/choose_book/1-BED-APARTEMENT/2.webp"
            alt="picture 1 bed appartement"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main_img swipe1">
          <img
            src="../../img/choose_book/1-BED-APARTEMENT/3.webp"
            alt="picture 1 bed appartement"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main_img swipe1">
          <img
            src="../../img/choose_book/1-BED-APARTEMENT/4.webp"
            alt="picture 1 bed appartement"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Swiper_img_1;
