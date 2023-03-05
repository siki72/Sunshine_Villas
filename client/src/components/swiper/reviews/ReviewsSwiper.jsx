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
import ReviewsCards from "./reviewsCards";

export default function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((resp) => resp.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="swiper">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((comment) => (
          <SwiperSlide key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
