import React from "react";
import "./Card.scss";
import icon from "../../assets/image/question-icon.png";

export const Card: React.FC<{
  image: string;
  level: number;
  onClick: () => void;
}> = ({ image, level, onClick }) => {
  const getStyle = () => {
    let style;
    switch (level) {
      case 0: {
        style = "card";
        break;
      }
      case 1: {
        style = "card level-1";
        break;
      }
      case 2: {
        style = "card level-2";
        break;
      }
      case 3: {
        style = "card level-3";
        break;
      }
    }
    return style;
  };

  return (
    <div className={getStyle()} onClick={onClick}>
      {level === 0 && <div className="card-hidden"></div>}
      <img
        className={`card-logo ${level > 0 && "visible"}`}
        src={image}
        alt="logo"
      />
      {level === 0 && (
        <img className="card-question-icon" src={icon} alt="icon" />
      )}
    </div>
  );
};
