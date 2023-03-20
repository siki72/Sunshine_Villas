import React from "react";
import CardVilla from "../components/CardVilla.jsx";
import ReviewsSwiper from "../components/swiper/reviews/ReviewsSwiper.jsx";
import { useSelector } from "react-redux";
const About = () => {
  const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>sunshine villas</h1>
          <h2>In beautiful Zanzibar</h2>
          <div>
            <img src="../img/logo/withe-logo.png" alt="trip-advisor-logo" />
          </div>
          <div>
            <img src="../img/logo/stars.png" alt="5-stars-logo" />
          </div>
        </div>
        <div className="text">
          <h3>
            Jambiani Villas was created from the combination of our great love
            for local African culture and hospitality of the highest quality.
          </h3>
          <p>
            That is why we can fully guarantee a perfect vacation full of
            harmony, peace, and the beauty of Zanzibar.
          </p>
        </div>

        <div className="about-main">
          <h4>Karibu Sana</h4>
          <div className="manager-img">
            <img src="../img/home/manager.png" alt="manager_pic" />
          </div>
          <h5>Ali missoum</h5>
          <h5>Ali Missoum</h5>
          <h5>Genral manager</h5>
        </div>

        <div className="sea-img">
          <figure>
            <blockquote cite="https://fr.wikipedia.org/wiki/Eleanor_Roosevelt">
              <p>
                TRUE HOSPITALITY CONSISTS OF GIVING THE BEST OF YOURSELF TO YOUR
                GUESTS.
              </p>
              <footer>- Eleanor Roosevelt</footer>
            </blockquote>
          </figure>
        </div>
        <div className="jambian-infos-grid">
          <div className="situation">
            <h4>
              Jambiani Villas, situated on Zanzibar’s East coast right next to
              the crystal clear waters of the Indian Ocean, is the perfect
              destination for a holiday.
            </h4>
            <p>
              On your doorstep, you will find miles of uninterrupted white sand
              beaming with activity There are plenty of restaurants, bars, water
              sports and boat trips to see wildlife in the sun. Our onsite
              restaurant and friendly staff will provide anything you need to
              make your stay enjoyable and memorable.
            </p>
          </div>
          <div className="situation-img"></div>
          <div className="plan"></div>
          <div className="about-jambiani">
            <h4>About Jambiani</h4>
            <p>
              Jambiani Villas is located on 3 properties, around 400 m from each
              other. Breakfast is served in our middle - Kati Kati - property.
              Our villa layout was intentionally designed to ensure a more
              private experience. Our guests can enjoy a pleasant, 4 minute walk
              on the beach to our restaurant location, and later return to their
              villa for a calm and quiet day by the beautiful Indian Ocean.
            </p>
          </div>
        </div>
        <div className="reviews">
          <div className="logo">
            <img src="../img/logo/black-logo.png" alt="" />
            <img src="../img/logo/stars.png" alt="" />
          </div>
          <ReviewsSwiper />
        </div>
        <div className="ours-villas">
          {!data ? (
            <div className="recherche">Aucune recette trouvé !</div>
          ) : (
            data.map((card) => <CardVilla key={card.id} card={card} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
