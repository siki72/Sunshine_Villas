import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CardVilla from "../components/CardVilla.jsx";
import { useSelector } from "react-redux";
import BookingVilla from "../components/BookingVilla.jsx";
import BookingModal from "../components/BookingModal.jsx";
import VillaOnePics from "../components/VillaOnePics.jsx";

const Bookings = () => {
  const { slug } = useParams();
  const { id } = useParams();
  const [idReady, setIdReady] = useState(false);
  const cards = useSelector((state) => state.threeCards.cards);
  const [isReserved, setIsReserved] = useState(false);
  const [showPics, setShowPics] = useState(false);
  console.log(showPics);
  console.log(slug);
  if (showPics) {
    return <VillaOnePics setShowPics={setShowPics} slug={slug} />;
  }
  return (
    <div className="booking">
      <header className="header_img">
        <img
          src="../../img/home/choose-villas.webp"
          alt="general villas view"
        />
      </header>
      <main className="container">
        <div className="title-choose">
          <h1>Choose your stay</h1>
        </div>
        <BookingModal setIsReserved={setIsReserved} isReserved={isReserved} />-
        <BookingVilla
          slug={slug}
          id={id}
          setIdReady={setIdReady}
          setIsReserved={setIsReserved}
          setShowPics={setShowPics}
        />
        <div className="title-cards">
          <h3>Check our others luxury villas and apartments</h3>
        </div>
        <div className="choose-villas-cards">
          {idReady &&
            cards
              ?.filter((card) => card.id != id)
              .map((card) => <CardVilla key={card.id} card={card} />)}
        </div>
      </main>
    </div>
  );
};

export default Bookings;
