import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardVilla from "./CardVilla";

const Home_section2 = () => {
  const dispatch = useDispatch(); // fait tout et a la fin incremonte le store
  const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store

  return (
    <section className="section_2">
      <div className="main_select">
        <h2>Select your dream space</h2>
        <div className="villas-cards">
          {!data ? (
            <div className="recherche">Aucune recette trouvé !</div>
          ) : (
            data.map((card) => <CardVilla key={card.id} card={card} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Home_section2;
