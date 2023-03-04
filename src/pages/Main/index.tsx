import React from "react";
import "./Main.scss";
import logo from "../../assets/image/logo-main.png";
import bg from "../../assets/image/bg-big.png";
import btn from "../../assets/image/btn-circle.png";
import rulesIcon from "../../assets/image/rules-icon.png";
import ratingIcon from "../../assets/image/rating-icon.png";
import cartsIcon from "../../assets/image/carts-icon.png";

import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { setEndGame } from "../../redux/game/slice";
import { useAppDispatch } from "../../redux/store";

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickGame = () => {
    dispatch(setEndGame(false));
    navigate("/game");
  };

  return (
    <div className="root main">
      <img className="bg" src={bg} alt="bg" />
      <img className="main-logo" src={logo} alt="logo" />
      <h1 className="main-text">
        Скорее начинай играть, чтобы собрать все карточки спортсменок!
      </h1>
      <div className="main-content">
        <div className="main-container-1">
          <div className="main-try">
            <p>Попыток сегодня:</p>
            <p>5</p>
          </div>
          <Button title={"Играть"} onClick={onClickGame} />
        </div>
        <div className="main-container-2">
          <div className="btn-circle">
            <img className="img-circle" src={btn} alt="btn" />
            <img className="icon-btn" src={ratingIcon} alt="icon" />
          </div>
          <div className="btn-circle" onClick={() => navigate("/collection")}>
            <img className="img-circle" src={btn} alt="btn" />
            <img className="icon-btn-2" src={cartsIcon} alt="icon" />
          </div>
          <div className="btn-circle" onClick={() => navigate("/rules")}>
            <img className="img-circle" src={btn} alt="btn" />
            <img className="icon-btn-2" src={rulesIcon} alt="icon" />
          </div>
        </div>
      </div>
      <div className="main-top"></div>
      <div className="main-bot"></div>
    </div>
  );
};
