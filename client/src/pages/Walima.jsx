import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Swiper_walima from "../components/swiper/walima/Swiper_walima.jsx";
import utils from "../users/utilsFunctions.js";

const Walima = () => {
  const [date, setDate] = useState(getTodayDate());
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = utils.getFormData(formRef, [
        "email",
        "name",
        "date",
        "guests",
      ]);
      const response = await utils.handleBookTable(formData);
      if (!response.ok) {
        throw new Error("unable to book a table");
      } else {
        formRef.current.reset();
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_ADMIN}walima`,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };

  return (
    <div className="walima-page">
      <header
        className="walima-header"
        aria-label="delicious pasta dish with a very tasty scampi"
        role="img"
      >
        <h1>Walima</h1>
      </header>
      <main>
        <div className="walima-main">
          <div className="text">
            <h2>
              Our restaurant ‘Walima’ stays with the coastal theme and means
              ‘sail’ in English, inspired by the awnings that cover the
              building,
            </h2>
            <p>
              The concept envisages serving meals based on fresh ingredients
              accompanied by a good selection of wines and cocktails, in
              particular: Buffet-style breakfast with a-la-carte dishes All day
              menu with seafood, fish, meat, fresh, and seasonal ingredients
              Daily changing desserts Fresh juices from local fruit and
              delicious milkshakes It also supports the community, serving a
              range of meals using fresh, local ingredients. La Shira also
              boasts a great selection of cocktails and wine to make your
              evening that bit more relaxing. After your meal, you can even go
              and chill out on the rooftop bar to enjoy the rest of your night
              with yet more stunning views.
            </p>
          </div>
          <div className="walima-img">
            <img src="../img/walima/2.webp" alt="walima restaurent picture" />
          </div>
        </div>
        <div className="walima-img-swiper">
          <Swiper_walima />
        </div>
        <div className="swahili">
          <div
            className="swahili-img"
            aria-label="diffents sort of swaili food"
            role="img"
          ></div>
          <div className="swahili-text">
            <h3>Sunshine Villas Swahili</h3>
            <p>
              The perfect opportunity to try authentic local cuisine! Book a
              table at La Shira Restaurant for a delicious all-you-can-eat
              buffet accompanied by live music! An event you can not miss!
            </p>
          </div>
        </div>
        <div className="reservation">
          <div>
            <h3>Come and try fresh food</h3>
            <p>
              Simply book your table now online, it only takes 1 minute, then
              let our teams take care of the rest.
            </p>
            <span>Book a table </span>
          </div>
          <form ref={formRef} action="" method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="name"
              required={true}
            />
            <input
              type="email"
              name="email"
              className="email"
              placeholder="Your Email"
              required={true}
            />
            <input
              type="date"
              name="date"
              id="date"
              min={getTodayDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            />
            <select name="guests" id="num-guests" required={true}>
              <option value="1">1 person</option>
              <option value="2">2 person</option>
              <option value="3">3 person</option>
              <option value="4">4 person</option>
              <option value="5+"> 5+ person</option>
            </select>
            <button type="submit" className={success ? "success-message" : ""}>
              {success ? "Your message has been sent successfully!" : "Send"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Walima;
