import React from "react";
import Card_villa from "./Card_villa";

const Home_section2 = () => {
  return (
    <div className="section_2">
      <div className="main_select">
        <h2>Select your dream space</h2>
        <div className="villas-cards">
          <Card_villa />
        </div>
      </div>
    </div>
  );
};

export default Home_section2;
