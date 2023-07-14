import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CardVilla from "../components/CardVilla.jsx";
import { useSelector } from "react-redux";
import BookingVilla from "../components/BookingVilla.jsx";
import BookingModal from "../components/BookingModal.jsx";
import VillaOnePics from "../components/VillaOnePics.jsx";
import LoginOrRegister from "../components/LoginOrRegister.jsx";
import { UserContext } from "../users/UserContext.jsx";
import ConfirmationRequired from "../components/ConfirmationRequired.jsx";

const Bookings = () => {
  const cards = [
    {
      id: 1,
      name: "1 bed appartement",
      max_guests: "2",
      area: 40,
      price: "110",
      infos:
        "Modern apartements with a private balcony overlooking the ocean, Perfect for couples.",
      url: "https://i.postimg.cc/5tvXMsdb/ezgif-com-gif-maker.webp",
      link: "/1-bed-apartement",
      created_at: "2023-05-11 16:36:41",
    },
    {
      id: 2,
      name: "2 bed villa",
      max_guests: "5",
      area: 90,
      price: "150",
      infos:
        "Villas designed for perfect and relaxing holidays, The ideal choice for those searching for a tropical home away from home.",
      url: "https://i.postimg.cc/SK10XzCf/card1.jpg",
      link: "/2-bed-villa",
      created_at: "2023-05-11 16:36:41",
    },
    {
      id: 3,
      name: "3 bed villa",
      max_guests: "7",
      area: 160,
      price: "290",
      infos:
        "Luxurious, tastefully decorated, and spacious villas providing stunning Ocean Views, The perfect base for a memorable vacation.",
      url: "https://i.postimg.cc/9FDDzG9J/card3.jpg",
      link: "/3-bed-villa",
      created_at: "2023-05-11 16:36:41",
    },
  ];
  const { slug } = useParams();
  const { id } = useParams();
  const [idReady, setIdReady] = useState(false);
  /*   const cards = useSelector((state) => state.threeCards.cards); */
  const [isReserved, setIsReserved] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [error, setError] = useState(false);
  const { user, mailConfirmed } = useContext(UserContext);
  if (showPics) {
    return <VillaOnePics setShowPics={setShowPics} slug={slug} />;
  }
  return (
    <div className="booking">
      {error && mailConfirmed === null && (
        <LoginOrRegister setError={setError} />
      )}
      {error && mailConfirmed === false && (
        <ConfirmationRequired user={user} setError={setError} />
      )}
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
          setError={setError}
        />
        <div className="title-cards">
          <h3>Check our others luxury villas and apartments</h3>
        </div>
        <div className="choose-villas-cards">
          {cards
            ?.filter((card) => card.id != id)
            .map((card) => (
              <CardVilla key={card.id} card={card} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Bookings;
