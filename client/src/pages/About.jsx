import React from "react";
import CardVilla from "../components/CardVilla.jsx";
import ReviewsSwiper from "../components/swiper/reviews/ReviewsSwiper.jsx";
import { useSelector } from "react-redux";
const About = () => {
  const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store

  return (
    <div className="about-page">
      <div className="container">
        <div
          className="about-header"
          aria-label="A view from above by a drone of the Sunshine villas"
          role="img"
        >
          <h1>sunshine villas</h1>
          <h2>In beautiful Zanzibar</h2>
          <div>
            <img src="../img/logo/withe-logo.webp" alt="trip-advisor-logo" />
          </div>
          <div>
            <img src="../img/logo/stars.webp" alt="5-stars-logo" />
          </div>
        </div>
        <div className="text">
          <h3>
            Sunshine Villas was created from the combination of our great love
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
            <img src="../img/home/manager.webp" alt="manager_pic" />
          </div>
          <h5>Ali missoum</h5>
          <h5>Ali Missoum</h5>
          <h6>Genral manager</h6>
        </div>

        <div
          className="sea-img"
          aria-label="picture of the sunshine hotel with the sea on front"
          role="img"
        >
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
              Sunshine Villas, situated on Zanzibar’s East coast right next to
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
          <div
            className="situation-img"
            aria-label="picture ok nakupenda beach"
            role="img"
          ></div>
          <div
            className="plan"
            aria-label="plan of the east coast"
            role="img"
          ></div>
          <div className="about-Sunshine">
            <h4>About Sunshine</h4>
            <p>
              Sunshine Villas is located on 3 properties, around 400 m from each
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
            <img
              src="../img/logo/black-logo.webp"
              alt="trip advisor black version"
            />
            <img src="../img/logo/stars.webp" alt="5 yellow stars picture" />
          </div>
          <ReviewsSwiper className="reviews-swiper" />
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
