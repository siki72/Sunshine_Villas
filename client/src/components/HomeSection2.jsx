import React from "react";
import { useSelector } from "react-redux";
import CardVilla from "./CardVilla";
import CardsSkeleton from "./CardsSkeleton";

const HomeSection2 = () => {
  /*   const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store */
  const data = [
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

  return (
    <section className="section_2">
      <div className="main_select">
        <h2>Select your dream space</h2>
        <div className="villas-cards">
          {data.map((card) => (
            <CardVilla key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection2;
