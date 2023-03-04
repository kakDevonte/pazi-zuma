import React from "react";
import "./PopupGame.scss";
import { Button } from "../Button";
import { ButtonGray } from "../ButtonGray";
import { useNavigate } from "react-router-dom";

export const PopupGame: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-game">
      <h1 className="popup-game-title">КАК ИГРАТЬ?</h1>
      <div className="container">
        <p className="text">
          В центре поля будут появляться иконки разных видов спорта. Тебе нужно
          собирать одинаковые иконки одного вида спорта, чтобы повысить ее
          уровень. Как только соберешь три иконки максимального уровня – ты
          получишь карточку спортсменки. Для повышения ее до серебряного или
          золотого уровня в следующей игре продолжай собирать иконки этого вида
          спорта!
        </p>
      </div>
      <div className="game-popup-btn-container">
        <Button title={"Продолжить"} onClick={onClick} />
        <ButtonGray
          title={"В меню"}
          disabled={false}
          onClick={() => {
            navigate("/main");
          }}
        />
      </div>
    </div>
  );
};
