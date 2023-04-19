import React, { useState } from "react";

import { useParams } from "react-router-dom";
import CardVilla from "../components/CardVilla.jsx";
import { useSelector } from "react-redux";
import BookingVilla from "../components/BookingVilla.jsx";
import BookingModal from "../components/BookingModal.jsx";

const Bookings = () => {
  const { slug } = useParams();
  const { id } = useParams();
  const [idReady, setIdReady] = useState(false);
  const cards = useSelector((state) => state.threeCards.cards);
  const [isReserved, setIsReserved] = useState(false);

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
        />
        <div className="title-cards">
          <h3>Check our others luxury villas and apartments</h3>
          <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-indigo-400 flex-shrink-0">
            A
          </div>
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
