import { configureStore } from "@reduxjs/toolkit";

import cardsReducer from "../feature/cards.slice";
import userReducer from "../feature/user.slice";
import villa1Reducer from "../feature/villa1.slice.js";

export default configureStore({
  // combiner touts nos reducer
  reducer: {
    // store threecards //
    // 1 - nom du store// -2 notre ficher slice(notre reducer)
    threeCards: cardsReducer,

    //store user
    userAvailaible: userReducer,
    // villa1 store
    villa_1_book: villa1Reducer,
  },
});
