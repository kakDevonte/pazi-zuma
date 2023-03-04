import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./types";

const initialState: GameState = {
  isOpen: false,
  level: 0,
  sport: 0,
  page: 1,
  isEndGame: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
    setData: (state, action) => {
      state.level = action.payload.level;
      state.sport = action.payload.sport;
    },
    toggleEndGame: (state) => {
      state.isEndGame = !state.isEndGame;
    },
    setEndGame: (state, action) => {
      state.isEndGame = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { openPopup, closePopup, toggleEndGame, setEndGame, setPage } =
  gameSlice.actions;
export default gameSlice.reducer;
