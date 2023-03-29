import { createSlice } from "@reduxjs/toolkit";

const villa1_slice = createSlice({
  name: "villa1_datas",
  initialState: {
    book: null,
  },
  reducers: {
    setBookDatas: (state, action) => {
      state.book = action.payload;
    },
    deleteBookDatas: (state, action) => {
      state.book = state.book.filter((row) => row.id !== action.payload);
    },
  },
});
export const { setBookDatas, deleteBookDatas } = villa1_slice.actions;

export default villa1_slice.reducer;
