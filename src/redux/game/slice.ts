import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./types";
import {
  addGame,
  addTry,
  getUserById,
  setIsGame,
  setUserNumber,
  spentTry,
  upCard,
} from "./asyncActions";

const initialState: GameState = {
  user: {
    id: 1,
    name: "no_username",
    first_name: "no_first_name",
    last_name: "no_last_name",
    tryCounter: 5,
    points: 0,
    cards: [
      { name: "tennis", level: 0 },
      { name: "skis", level: 0 },
      { name: "volleyball", level: 0 },
      { name: "skates", level: 0 },
      { name: "fencing", level: 0 },
      { name: "hockey", level: 0 },
    ],
    personalNumber: 0,
    isGame: false,
    isSubscribe: false,
    gameCounter: 0,
    referrals: {
      referrer_id: 0,
      is_active: false,
    },
  },
  bg: {
    load: "",
    main: "",
    normal: "",
    game: "",
  },
  isOpen: false,
  isPhone: false,
  level: 0,
  sport: 0,
  page: 1,
  isEndGame: false,
  startGame: "",
  points: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBg: (state, action) => {
      state.bg = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setStartGame: (state, action) => {
      state.startGame = action.payload;
    },
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
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(setUserNumber.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(setIsGame.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(upCard.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(spentTry.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(addGame.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(addTry.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  openPopup,
  closePopup,
  toggleEndGame,
  setEndGame,
  setPage,
  setUser,
  setBg,
  setStartGame,
  setPoints,
} = gameSlice.actions;
export default gameSlice.reducer;
