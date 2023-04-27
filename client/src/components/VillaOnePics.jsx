import { faCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "flowbite-react";
import React from "react";

const VillaOnePics = ({ setShowPics, slug }) => {
  console.log(slug);
  return (
    <div className="all-pics">
      <h1>Photos of our {slug.toLowerCase().split("-").join(" ")}</h1>

      <div className="main_img swipe1">
        <button className="closeBtn" onClick={() => setShowPics(false)}>
          <FontAwesomeIcon className="x-icon" icon={faCircleXmark} />
          close pictures
        </button>
        <img
          src={`../../img/choose_book/${slug}/1.webp`}
          alt="picture 1 bed appartement"
        />
      </div>
      <div className="main_img swipe1">
        <img
          src={`../../img/choose_book/${slug}/2.webp`}
          alt="picture 1 bed appartement"
        />
      </div>
      <div className="main_img swipe1">
        <img
          src={`../../img/choose_book/${slug}/3.webp`}
          alt="picture 1 bed appartement"
        />
      </div>
      <div className="main_img swipe1">
        <img
          src={`../../img/choose_book/${slug}/4.webp`}
          alt="picture 1 bed appartement"
        />
      </div>
    </div>
  );
};

export default VillaOnePics;
