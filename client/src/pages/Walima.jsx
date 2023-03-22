import React from "react";
import { useState } from "react";
import Swiper_walima from "../components/swiper/walima/Swiper_walima.jsx";

const Walima = () => {
  const [date, setDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="walima-page">
      <div className="walima-header">
        <h1>Walima</h1>
      </div>
      <div className="walima-main">
        <div className="text">
          <h3>
            Our restaurant ‘Walima’ stays with the coastal theme and means
            ‘sail’ in English, inspired by the awnings that cover the building,
          </h3>
          <p>
            The concept envisages serving meals based on fresh ingredients
            accompanied by a good selection of wines and cocktails, in
            particular: Buffet-style breakfast with a-la-carte dishes All day
            menu with seafood, fish, meat, fresh, and seasonal ingredients Daily
            changing desserts Fresh juices from local fruit and delicious
            milkshakes It also supports the community, serving a range of meals
            using fresh, local ingredients. La Shira also boasts a great
            selection of cocktails and wine to make your evening that bit more
            relaxing. After your meal, you can even go and chill out on the
            rooftop bar to enjoy the rest of your night with yet more stunning
            views.
          </p>
        </div>
        <div className="walima-img">
          <img src="../img/walima/2.jpeg" alt="" />
        </div>
      </div>
      <div className="walima-img-swiper">
        <Swiper_walima />
      </div>
      <div className="swahili">
        <div className="swahili-img"></div>
        <div className="swahili-text">
          <h4>Sunshine Villas Swahili</h4>
          <p>
            The perfect opportunity to try authentic local cuisine! Book a table
            at La Shira Restaurant for a delicious all-you-can-eat buffet
            accompanied by live music! An event you can not miss!
          </p>
        </div>
      </div>
      <div className="reservation">
        <div>
          <h4>Come and try fresh food</h4>
          <p>
            Simply book your table now online, it only takes 1 minute, then let
            our teams take care of the rest.
          </p>
          <span>Book a table </span>
        </div>
        <form action="" method="post">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="name"
          />
          <input
            type="email"
            name="email"
            className="email"
            placeholder="Your Email"
          />
          <input
            type="date"
            name="date"
            id="date"
            min={getTodayDate()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select name="guests" id="num-guests">
            <option value="1">1 person</option>
            <option value="2">2 person</option>
            <option value="3">3 person</option>
            <option value="4">1 person</option>
            <option value="5+"> 5+ person</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Walima;
