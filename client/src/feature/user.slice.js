import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  // un slice c est la fusion de  l'action et du reducer
  // action: chose à faire , reducer : modification du store
  // ça prends trois chose :
  // 1- reducer name:
  name: "user_reducer",

  // 2- state de base
  initialState: {
    user: null,
  },

  // 3- reducer

  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },
  },
});

// action et reducer au méme endroit

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
