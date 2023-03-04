import axios from "axios";

const instance = axios.create({
  //baseURL: 'https://297349.simplecloud.ru/api/',
  // baseURL: 'http://localhost:4000/api/',
  //baseURL: 'https://server.bulochkin.site/api/',
  baseURL: "https://305493.simplecloud.ru/api/",
});

export const tanukiAPI = {
  getUser(id: number) {
    return instance.get(`users/${id}`);
  },
  updateUser(user: any) {
    return instance.put(`users/`, user);
  },
  createUser(user: any) {
    return instance.post(`users/`, user);
  },
  getUsers() {
    return instance.get(`users/`);
  },
  endGame() {
    return instance.get(`stats/end`);
  },
};
