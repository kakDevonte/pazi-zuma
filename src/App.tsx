import React from "react";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { Rules } from "./pages/Rules";
import { Loading } from "./pages/Loading";
import { Auth } from "./pages/Auth";
import { Main } from "./pages/Main";
import { Collection } from "./pages/Collection";
import { EndGame } from "./pages/EndGame";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/game"} element={<Game />} />
        <Route path={"/rules"} element={<Rules />} />
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/main"} element={<Main />} />
        <Route path={"/collection"} element={<Collection />} />
        <Route path={"/end"} element={<EndGame />} />
        <Route path={"/"} element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}
