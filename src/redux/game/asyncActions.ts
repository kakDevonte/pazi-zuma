import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./types";
import { API } from "../../api/api";
// import { starAPI } from '../../api/api';

export const getUserById = createAsyncThunk<User, number>(
  "game/getUserById",
  async (id) => {
    const { data } = await API.getUser(id);
    return data;
  }
);

export const spentTry = createAsyncThunk<User, number>(
  "game/spentTry",
  async (id) => {
    const { data } = await API.spentTry(id);
    return data;
  }
);

export const upCard = createAsyncThunk<User, { id: number; sport: number }>(
  "game/upCard",
  async (value) => {
    console.log(value);
    const { data } = await API.upCard(value.id, value.sport);
    console.log(data);
    return data;
  }
);

export const setIsGame = createAsyncThunk<User, number>(
  "game/setIsGame",
  async (id) => {
    const { data } = await API.setIsGame(id);
    return data;
  }
);

export const addGame = createAsyncThunk<User, number>(
  "game/addGame",
  async (id) => {
    const { data } = await API.addGame(id);
    return data;
  }
);

export const addTry = createAsyncThunk<User, number>(
  "game/addTry",
  async (id) => {
    const { data } = await API.addTry(id);
    return data;
  }
);

export const setUserNumber = createAsyncThunk<
  User,
  { id: number; personalNumber: string }
>("game/setNumber", async (value) => {
  const { data } = await API.setNumber(value.id, value.personalNumber);
  return data;
});

// export const getFilmByArray = createAsyncThunk<FilmType[], string[]>(
//   "films/getFilmByArray",
//   async (array) => {
//     const peopleArray: FilmType[] = await Promise.all(
//       array.map(async (item) => {
//         const { data } = await starAPI.getFilmById(Number(item));
//         return data;
//       })
//     );
//
//     return peopleArray;
//   }
// );
