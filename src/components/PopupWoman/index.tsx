import React from "react";
import "./PopupWoman.scss";
import { data } from "../../utils/women";
import { Button } from "../Button";

export const PopupWoman: React.FC<{
  sport: number;
  level: number;
  onClick: () => void;
}> = ({ sport, level, onClick }) => {
  return (
    <div className="popup">
      <div className="container">
        <h1 className="popup-title">{data[sport].name}</h1>
        <div className="popup-img-container">
          <img
            className="popup-image"
            src={data[sport].levels[level - 1].image}
          />
        </div>
        <p className="text">{data[sport].levels[level - 1].text}</p>
        <Button title={"Назад"} disable={false} onClick={onClick} />
      </div>
    </div>
  );
};
