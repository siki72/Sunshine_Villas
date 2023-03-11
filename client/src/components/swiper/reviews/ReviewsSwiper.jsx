import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./swiperStyle.css";

export default function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://alimissoum.app.3wa.io/reveiws")
      .then((resp) => resp.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div className="swiper">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={true}
        className="mySwiper"
      >
        {reviews.map((comment) => (
          <SwiperSlide key={comment.id}>
            <div>
              <h3>Guest reviews :</h3>

              <span>
                <img src={comment.link} alt={"picture" + comment.name} />{" "}
                <h4>{comment.name}</h4>
                <h4>5/5</h4>
              </span>
              <p>{comment.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
