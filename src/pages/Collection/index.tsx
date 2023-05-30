import React from "react";
import "./Collection.scss";
import logo from "../../assets/image/logo-carts.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { PopupWoman } from "../../components/PopupWoman";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { data } from "../../utils/women";
import { getUserById } from "../../redux/game/asyncActions";

export const Collection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bg = useAppSelector((state) => state.game.bg);
  const user = useAppSelector((state) => state.game.user);
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [sport, setSport] = React.useState<number>(0);
  const [level, setLevel] = React.useState<number>(0);

  React.useEffect(() => {
    // @ts-ignore
    const telegram = window["Telegram"]["WebApp"];
    dispatch(getUserById(telegram.initDataUnsafe.user.id));
  }, []);

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
        <img className="bg" src={bg.normal} alt="bg" />
        <img className="cards-logo" src={logo} alt="logo" />
        <div className="cards-content">
          <Card
            image={
              data[0].levels[
                user.cards[0].level - 1 <= 0 ? 0 : user.cards[0].level - 1
              ].logo
            }
            level={user.cards[0].level}
            onClick={() => onClickCard(0, user.cards[0].level)}
          />
          <Card
            image={
              data[1].levels[
                user.cards[1].level - 1 <= 0 ? 0 : user.cards[1].level - 1
              ].logo
            }
            level={user.cards[1].level}
            onClick={() => onClickCard(1, user.cards[1].level)}
          />
          <Card
            image={
              data[2].levels[
                user.cards[2].level - 1 <= 0 ? 0 : user.cards[2].level - 1
              ].logo
            }
            level={user.cards[2].level}
            onClick={() => onClickCard(2, user.cards[2].level)}
          />
          <Card
            image={
              data[3].levels[
                user.cards[3].level - 1 <= 0 ? 0 : user.cards[3].level - 1
              ].logo
            }
            level={user.cards[3].level}
            onClick={() => onClickCard(3, user.cards[3].level)}
          />
          <Card
            image={
              data[4].levels[
                user.cards[4].level - 1 <= 0 ? 0 : user.cards[4].level - 1
              ].logo
            }
            level={user.cards[4].level}
            onClick={() => onClickCard(4, user.cards[4].level)}
          />
          <Card
            image={
              data[5].levels[
                user.cards[5].level - 1 <= 0 ? 0 : user.cards[5].level - 1
              ].logo
            }
            level={user.cards[5].level}
            onClick={() => onClickCard(5, user.cards[5].level)}
          />
        </div>
        <Button
          title={"Назад"}
          disable={false}
          onClick={() => navigate("/main")}
        />
      </div>
    </>
  );
};
