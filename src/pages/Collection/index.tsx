import React from "react";
import "./Collection.scss";
import bg from "../../assets/image/bg-big.png";
import logo from "../../assets/image/logo-carts.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";

import fencing from "../../assets/image/woman/icon/fencing-woman.png";
import hockey from "../../assets/image/woman/icon/hockey-woman.png";
import skates from "../../assets/image/woman/icon/skates-woman.png";
import skis from "../../assets/image/woman/icon/skis-woman.png";
import tennis from "../../assets/image/woman/icon/tennis-woman.png";
import volleyball from "../../assets/image/woman/icon/volleyball-woman.png";
import { PopupWoman } from "../../components/PopupWoman";

export const Collection: React.FC = () => {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [sport, setSport] = React.useState<number>(0);
  const [level, setLevel] = React.useState<number>(0);

  const onClickCard = (sport: number, level: number) => {
    if (level === 0) return;
    setSport(sport);
    setLevel(level);
    setOpenPopup(!openPopup);
  };

  return (
    <>
      {openPopup && (
        <PopupWoman
          sport={sport}
          level={level}
          onClick={() => setOpenPopup(!openPopup)}
        />
      )}
      <div className="root cards">
        <img className="bg" src={bg} alt="bg" />
        <img className="cards-logo" src={logo} alt="logo" />
        <div className="cards-content">
          <Card image={tennis} level={3} onClick={() => onClickCard(0, 3)} />
          <Card image={skis} level={2} onClick={() => onClickCard(1, 2)} />
          <Card
            image={volleyball}
            level={0}
            onClick={() => onClickCard(2, 0)}
          />
          <Card image={skates} level={0} onClick={() => onClickCard(3, 0)} />
          <Card image={fencing} level={1} onClick={() => onClickCard(4, 1)} />
          <Card image={hockey} level={0} onClick={() => onClickCard(5, 0)} />
        </div>
        <Button title={"Назад"} onClick={() => navigate("/main")} />
        <div className="cards-top"></div>
        <div className="cards-bot"></div>
      </div>
    </>
  );
};
