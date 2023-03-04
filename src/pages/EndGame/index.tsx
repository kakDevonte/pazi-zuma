import React from "react";
import "./EndGame.scss";
import logo from "../../assets/image/end-logo.png";
import bg from "../../assets/image/bg-big.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { toggleEndGame } from "../../redux/game/slice";

export const EndGame: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickNextTry = () => {
    dispatch(toggleEndGame());
    navigate("/game");
  };
  return (
    <div className="main root">
      <img className="bg" src={bg} alt="bg" />
      <img className="main-logo" src={logo} alt="logo" />
      <h1 className="main-text">
        Давай посмотрим, сколько карточек нам удалось открыть. Сыграем еще раз,
        чтобы получить их все?
      </h1>
      <div className="end-container-1">
        <div className="end-container-2">
          <Button title={"Еще раз"} onClick={onClickNextTry} />
          <Button
            title={"К коллекции"}
            onClick={() => {
              navigate("/collection");
            }}
          />
        </div>
        <Button
          title={"В меню"}
          onClick={() => {
            navigate("/main");
          }}
        />
      </div>
      <div className="main-top"></div>
      <div className="main-bot"></div>
    </div>
  );
};
