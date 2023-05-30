import axios from "axios";
import { User } from "../redux/game/types";

const instance = axios.create({
  //baseURL: 'https://297349.simplecloud.ru/api/',
  //baseURL: "http://localhost:5000/api/",
  baseURL: "https://305493.simplecloud.ru/api/",
});

export const API = {
  getUser(id: number) {
    return instance.get<User>(`user/${id}`);
  },
  addTry(id: number) {
    return instance.get<User>(`user/addTry/${id}`);
  },
  upCard(id: number, sport: number) {
    return instance.put<User>(`user/upCard/`, { id, sport });
  },
  setNumber(id: number, personalNumber: string) {
    console.log(id, personalNumber);
    return instance.put<User>(`user/setNumber/`, { id, personalNumber });
  },
  setIsGame(id: number) {
    return instance.put<User>(`user/setIsGame/`, { id });
  },
  addGame(id: number) {
    return instance.put<User>(`user/addGame/`, { id });
  },
  spentTry(id: number) {
    return instance.put<User>(`user/spentTry/`, { id });
  },
  createUser(id: number, name: string) {
    return instance.post<User>(`user/`, { id, name });
  },
  getLeaders(id: number) {
    return instance.get(`user/leaders/${id}`);
  },
  clickRegisterButton() {
    return instance.get(`stats/registr`);
  },
  endGame() {
    return instance.get(`stats/endGame`);
  },
  openApp() {
    return instance.get(`stats/open`);
  },
  endSession(
    id: number,
    username: string,
    result: number,
    startDate: string,
    endDate: string
  ) {
    return instance.post(`stats/session`, {
      id,
      username,
      result,
      startDate,
      endDate,
    });
  },
};
