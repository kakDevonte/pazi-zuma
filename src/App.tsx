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
import { Leaders } from "./pages/Leaders";
import { useAppDispatch } from "./redux/store";
import { getUserById } from "./redux/game/asyncActions";
import { setBg } from "./redux/game/slice";
import bgMain from "./assets/image/bg/bg-main.png";
import bgMainPhone from "./assets/image/bg/bg-main-phone.png";
import bgLoad from "./assets/image/bg-load.png";
import bgLoadPhone from "./assets/image/bg/bg-load-phone.png";
import bg from "./assets/image/bg-big.png";
import bgPhone from "./assets/image/bg/bg-phone.png";
import bgGame from "./assets/image/bg-game-big.png";
import bgGamePhone from "./assets/image/bg/bg-game-phone.png";
import { API } from "./api/api";

export default function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      await API.openApp();
    })();
  }, []);

  React.useEffect(() => {
    // @ts-ignore
    const telegram = window["Telegram"]["WebApp"];
    dispatch(getUserById(telegram.initDataUnsafe.user.id)); //263403602  telegram.initDataUnsafe.user.id
    //dispatch(getUserById(1));
    if (telegram.platform !== "tdesktop") {
      dispatch(
        setBg({
          load: bgLoadPhone,
          main: bgMainPhone,
          normal: bgPhone,
          game: bgGamePhone,
        })
      );
    } else {
      dispatch(setBg({ load: bgLoad, main: bgMain, normal: bg, game: bgGame }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/game"} element={<Game />} />
        <Route path={"/rules"} element={<Rules />} />
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/main"} element={<Main />} />
        <Route path={"/collection"} element={<Collection />} />
        <Route path={"/end"} element={<EndGame />} />
        <Route path={"/leaders"} element={<Leaders />} />
        <Route path={"/"} element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}
