import React from "react";
import { useSelector } from "react-redux";
import CardVilla from "./CardVilla";
import CardsSkeleton from "./CardsSkeleton";

const HomeSection2 = () => {
  const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store

  return (
    <section className="section_2">
      <div className="main_select">
        <h2>Select your dream space</h2>
        <div className="villas-cards">
          {!data ? (
            <CardsSkeleton />
          ) : (
            data.map((card) => <CardVilla key={card.id} card={card} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeSection2;
