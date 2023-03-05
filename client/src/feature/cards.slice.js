import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  // un slice c est la fusion de  l'action et du reducer
  // action: chose à faire , reducer : modification du store

  // ça prends trois chose :

  // 1- reducer name:
  name: "displayCards",

  // 2- state de base
  initialState: {
    cards: null,
  },

  // 3- reducers
  reducers: {
    setCardsData: (state, action) => {
      state.cards = action.payload;
    },
  },
});

// action et reducer au méme endroit

export const { setCardsData } = cardsSlice.actions;

export default cardsSlice.reducer;
