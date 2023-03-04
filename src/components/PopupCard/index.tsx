import React from "react";
import "./PopupCard.scss";
import { useAppSelector } from "../../redux/store";
import { data } from "../../utils/women";
import { Button } from "../Button";

export const PopupCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const level = useAppSelector((state) => state.game.level);
  const sport = useAppSelector((state) => state.game.sport);

  return (
    <div className="popup-card">
      <div className="container">
        <h1 className="popup-title">{data[sport].name}</h1>
        <div className="popup-img-container">
          <img
            className="popup-image"
            src={data[sport].levels[level - 1].image}
          />
        </div>
        <p className="text">{data[sport].levels[level - 1].text}</p>
        <Button title={"Далее"} onClick={onClick} />
      </div>
    </div>
  );
};
