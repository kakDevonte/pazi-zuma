import React from "react";
import "./Rules.scss";
import bg from "../../assets/image/bg-big.png";
import logo from "../../assets/image/logo-rules.png";
import { Button } from "../../components/Button";
import { ButtonGray } from "../../components/ButtonGray";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPage } from "../../redux/game/slice";

export const Rules: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.game.page);

  const navigate = useNavigate();

  const getContent = (page: number) => {
    let content;
    switch (page) {
      case 1: {
        content = (
          <>
            <div className="container">
              <p className="text">
                Поздравляем прекрасных дам с праздником. Но призы смогут
                получить абсолютно все! Решай нашу головоломку, открывай как
                можно больше карточек с известными российскими спортсменками и
                те, кто соберет наибольшее количество карточек, получат призы от
                PARI
              </p>
            </div>
            <Button
              title={"Далее"}
              onClick={() => dispatch(setPage(page + 1))}
            />
          </>
        );
        break;
      }
      case 2: {
        content = (
          <>
            <div className="container">
              <p className="text">
                В центре поля будут появляться иконки разных видов спорта. Тебе
                нужно собирать одинаковые иконки одного вида спорта, чтобы
                повысить ее уровень. Как только соберешь три иконки
                максимального уровня – ты получишь карточку спортсменки. Для
                повышения ее до серебряного или золотого уровня в следующей игре
                продолжай собирать иконки этого вида спорта!
              </p>
            </div>
            <Button
              title={"Далее"}
              onClick={() => dispatch(setPage(page + 1))}
            />
          </>
        );
        break;
      }
      case 3: {
        content = (
          <>
            <div className="container">
              <p className="text">
                Чтобы получить фрибет, тебе нужно собрать как можно больше
                карточек и занять место выше в таблице.
                <br />
                1-25) 1000р <br />
                26-50) 500р <br />
                51-100) 250р <br />
                <br />
                Каждый день у тебя будет 3 попытки!
                <br />
                Также, чтобы получить призы нужно: <br />– быть подписанным на{" "}
                <a
                  className="rules-link"
                  href="https://t.me/+nTG05yUr6rthNGNi"
                  target="_blank"
                >
                  канал PARI
                </a>
                <br />– ввести номер личного кабинета PARI.
              </p>
            </div>
            <div className="rules-btn-container">
              <Button
                title={"Авторизоваться"}
                onClick={() => {
                  navigate("/auth");
                }}
              />
              <ButtonGray
                title={"Пропустить"}
                disabled={false}
                onClick={() => {
                  navigate("/main");
                  dispatch(setPage(1));
                }}
              />
            </div>
          </>
        );
        break;
      }
    }
    return content;
  };

  return (
    <div className="root rules">
      <img className="bg" src={bg} alt="bg" />
      <img className="rules-logo" src={logo} alt="logo" />
      {getContent(page)}
      <div className="rules-top"></div>
      <div className="rules-bot"></div>
    </div>
  );
};
