import React from "react";
import { IonPhaser } from "@ion-phaser/react";
import { config } from "../../game/scripts";

import "./Game.scss";
import circle from "../../assets/image/circle.png";
import logo from "../../assets/image/logo-game.png";
import btn from "../../assets/image/btn-pause.png";
import { PopupGame } from "../../components/PopupGame";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { closePopup, openPopup, setPoints } from "../../redux/game/slice";
import { PopupCard } from "../../components/PopupCard";
import { Navigate } from "react-router-dom";
import { getUserById, spentTry } from "../../redux/game/asyncActions";

export const Game: React.FC = () => {
  const isOpen = useAppSelector((state) => state.game.isOpen);
  const user = useAppSelector((state) => state.game.user);
  const isEndGame = useAppSelector((state) => state.game.isEndGame);
  const bg = useAppSelector((state) => state.game.bg);

  const [time, setTimer] = React.useState<number>(3);
  const dispatch = useAppDispatch();
  const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false);
  const gameRef = React.useRef(null); //<React.Ref<HTMLIonPhaserElement> | undefined>
  let phaserGameObject: any;

  React.useEffect(() => {
    // @ts-ignore
    const telegram = window["Telegram"]["WebApp"];
    // // dispatch(getUserById(telegram.initDataUnsafe.user.id));
    dispatch(spentTry(telegram.initDataUnsafe.user.id));
  }, []);

  React.useEffect(() => {
    dispatch(setPoints(0));
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimer((value) => value - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (isEndGame) return;
    // @ts-ignore
    const PhaserGameInstance = gameRef?.current
      .getInstance()
      .then((game: any) => (phaserGameObject = game));
  });

  const onClickPause = () => {
    setIsOpenPopup(!isOpenPopup);
    phaserGameObject.events.emit("PAUSE_EVENT", "hello");
  };

  const onClickResume = () => {
    setIsOpenPopup(!isOpenPopup);
    phaserGameObject.events.emit("RESUME_EVENT", "hello");
  };

  const onClickNextGame = () => {
    dispatch(closePopup());
    phaserGameObject.events.emit("RESUME_EVENT", "hello");
  };

  if (isEndGame) return <Navigate to={"/end"} />;

  return (
    <>
      {time > 0 && (
        <div className="timer">
          <h1 className="timer-text">{time}</h1>
        </div>
      )}
      {isOpen && <PopupCard onClick={onClickNextGame} />}
      {isOpenPopup && <PopupGame onClick={onClickResume} />}
      <div className="game-root">
        <img className="bg" src={bg.game} alt="bg" />
        <img className="game-logo" src={logo} alt="logo" />
        <img
          className="game-button"
          src={btn}
          alt="btn"
          onClick={onClickPause}
        />
        <img className="circle" src={circle} alt="circle" />
        <IonPhaser ref={gameRef} game={config} />
      </div>
    </>
  );
};
