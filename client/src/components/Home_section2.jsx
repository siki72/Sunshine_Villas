import React, { useEffect } from "react";
import { useState } from "react";
import CardVilla from "./CardVilla";

const Home_section2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://alimissoum.app.3wa.io/cards`)
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="section_2">
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
    </div>
  );
};

export default Home_section2;
