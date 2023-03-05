import { configureStore } from "@reduxjs/toolkit";

import cardsReducer from "../feature/cards.slice";

export default configureStore({
  // combiner touts nos reducer
  reducer: {
    // store threecards //
    threeCards: cardsReducer,
  },
});
