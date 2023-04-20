import React, { useState } from "react";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";
import { setCardsData } from "./feature/cards.slice.js";
function App() {
  const [cards, setCards] = useState(null);
  const dispatch = useDispatch(); // fait tout et a la fin incremonte le store
  //const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store

  if (!cards) {
    fetch(`${import.meta.env.VITE_URL_CARDS_DATAS}`)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setCardsData(data));
        setCards(true);
      });
  }

  return <Routes />;
}

export default App;
