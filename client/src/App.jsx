import React, { useState } from "react";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";
import { setCardsData } from "./feature/cards.slice.js";
function App() {
  const [cards, setCards] = useState(null);
  const dispatch = useDispatch();
  if (!cards) {
    fetch("https://alimissoum.app.3wa.io/villas")
      .then((resp) => resp.json())
      .then((data) => {
        console.log("je suis aprtie chercher la data" + data);
        dispatch(setCardsData(data));
        setCards(true);
      });
  }

  return <Routes />;
}

export default App;
