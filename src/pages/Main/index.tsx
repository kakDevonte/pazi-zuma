import React from "react";
import "./Main.scss";
import logo from "../../assets/image/logo-main.png";
import btn from "../../assets/image/btn-circle.png";
import rulesIcon from "../../assets/image/rules-icon.png";
import ratingIcon from "../../assets/image/rating-icon.png";
import cartsIcon from "../../assets/image/carts-icon.png";

import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { setEndGame, setPoints, setStartGame } from "../../redux/game/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  addGame,
  addTry,
  getUserById,
  setIsGame,
} from "../../redux/game/asyncActions";

function sendMessage(chat_id: number) {
  const token = "5980470665:AAGXdJJm44FY-_W6djbBrgSC7wuS4MH50Rs";
  const text =
    "Кто-то из друзей присоединился к игре! Уже начислили тебе попытку. Бегом играть!";
  const url = `https://api.telegram.org/bot${token}/sendMessage`; // The url to request

  const obj = {
    disable_web_page_preview: false,
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Играть",
            web_app: { url: "https://305491.simplecloud.ru/" },
          },
          {
            text: "Больше попыток",
            callback_data: `03`,
          },
        ],
      ],
    }),
    chat_id: chat_id, // Telegram chat id
    text: text,
    // The text to send
  };

  const xht = new XMLHttpRequest();
  xht.open("POST", url, true);
  xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xht.send(JSON.stringify(obj));
}

export const Main: React.FC = () => {
  const user = useAppSelector((state) => state.game.user);
  const bg = useAppSelector((state) => state.game.bg);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // @ts-ignore
    const telegram = window["Telegram"]["WebApp"];
    dispatch(getUserById(telegram.initDataUnsafe.user.id));
  }, []);

  React.useEffect(() => {
    if (user.isGame) return;
    dispatch(setIsGame(user.id));
  }, []);

  const onClickGame = () => {
    dispatch(setPoints(0));
    dispatch(setStartGame(new Date().toString()));
    dispatch(setEndGame(false));
    dispatch(addGame(user.id));
    if (user?.referrals.referrer_id && !user.referrals.is_active) {
      sendMessage(user.referrals.referrer_id);
      dispatch(addTry(user.id));
    }
    navigate("/game");
  };

  return (
    <div className="root main">
      <img className="bg" src={bg.main} alt="bg" />
      <img className="main-logo" src={logo} alt="logo" />
      <h1 className="main-text">
        Скорее начинай играть, чтобы собрать все карточки спортсменок!
      </h1>
      <div className="main-content">
        <div className="main-container-1">
          <div className="main-try">
            <p>Попыток сегодня:</p>
            <p>{user?.tryCounter}</p>
          </div>
          <Button
            title={"Играть"}
            disable={user?.tryCounter <= 0}
            onClick={onClickGame}
          />
        </div>
        <div className="main-container-2">
          <div
            className="btn-circle"
            onClick={() => {
              console.log("жму");

              navigate("/leaders");
            }}
          >
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
    </div>
  );
};
