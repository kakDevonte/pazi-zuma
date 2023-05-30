import React from "react";
import "./EndGame.scss";
import logo from "../../assets/image/end-logo.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPoints, setStartGame, toggleEndGame } from "../../redux/game/slice";
import { spentTry } from "../../redux/game/asyncActions";
import { API } from "../../api/api";

export const EndGame: React.FC = () => {
  const user = useAppSelector((state) => state.game.user);
  const bg = useAppSelector((state) => state.game.bg);
  const points = useAppSelector((state) => state.game.points);
  const startGame = useAppSelector((state) => state.game.startGame);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      await API.endGame();
      await API.endSession(
        user.id,
        user.name,
        points,
        startGame,
        new Date().toString()
      );
    })();
  }, []);

  const onClickNextTry = () => {
    dispatch(setPoints(0));
    dispatch(setStartGame(new Date().toString()));
    dispatch(toggleEndGame());
    // dispatch(spentTry(user.id));
    navigate("/game");
  };
  return (
    <div className="main root">
      <img className="bg" src={bg.normal} alt="bg" />
      <img className="main-logo" src={logo} alt="logo" />
      <h1 className="main-text">
        Давай посмотрим, сколько карточек нам удалось открыть. Сыграем еще раз,
        чтобы получить их все?
      </h1>
      <div className="end-container-1">
        <div className="end-container-2">
          <Button
            title={"Еще раз"}
            disable={user.tryCounter <= 0}
            onClick={onClickNextTry}
          />
          <Button
            title={"К коллекции"}
            disable={false}
            onClick={() => {
              navigate("/collection");
            }}
          />
        </div>
        <Button
          title={"В меню"}
          disable={false}
          onClick={() => {
            navigate("/main");
          }}
        />
      </div>
    </div>
  );
};
