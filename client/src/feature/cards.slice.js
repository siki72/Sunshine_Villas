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
    editVillaData: (state, action) => {
      state.cards = state.cards.map((villa) => {
        if (villa.id === action.payload[1]) {
          return {
            ...villa,
            name: action.payload[0].name,
            price: action.payload[0].price,
            url: action.payload[0].url,
            infos: action.payload[0].infos,
          };
        } else {
          return villa;
        }
      });
    },
  },
});

// action et reducer au méme endroit

export const { setCardsData, editVillaData } = cardsSlice.actions;

export default cardsSlice.reducer;
