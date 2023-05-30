import React from "react";
import "./Leaders.scss";
import logo from "../../assets/image/leader-logo.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { API } from "../../api/api";
import { use } from "matter";
import { getUserById } from "../../redux/game/asyncActions";

type Item = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  points: number;
};

const maskForName = (firstName: string, lastName: string, name: string) => {
  if (firstName && lastName) {
    const mask1 = firstName.substring(0, 3);
    const mask2 = lastName.substring(lastName.length - 3);
    if (firstName.length > 3 && lastName.length > 3) {
      return mask1 + "********" + mask2;
    } else {
      return (
        firstName.substring(0, 1) +
        "********" +
        lastName.substring(lastName.length - 1)
      );
    }
  } else {
    const mask1 = name.substring(0, 3);
    const mask2 = name.substring(name.length - 3);
    if (name.length > 6) {
      return mask1 + "********" + mask2;
    } else {
      return (
        name.substring(0, 1) + "********" + name.substring(name.length - 1)
      );
    }
  }
};

export const Leaders: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bg = useAppSelector((state) => state.game.bg);
  const user = useAppSelector((state) => state.game.user);
  const [leaders, setLeaders] = React.useState<Item[]>([]);
  const [number, setNumber] = React.useState(0);
  const [isList, setIsList] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const telegram = window["Telegram"]["WebApp"];
        const { data } = await API.getLeaders(telegram.initDataUnsafe.user.id); //499423307  telegram.initDataUnsafe.user.id
        setLeaders(data.leaders);
        setNumber(data.index + 1);
        setIsList(data.isOnList);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  React.useEffect(() => {
    // @ts-ignore
    const telegram = window["Telegram"]["WebApp"];
    dispatch(getUserById(telegram.initDataUnsafe.user.id));
  }, []);

  const getMedal = (index: number) => {
    let str;
    switch (index) {
      case 0: {
        str = "🏆";
        break;
      }
      case 1: {
        str = "🥈";
        break;
      }
      case 2: {
        str = "🥉";
        break;
      }
      default: {
        str = "";
        break;
      }
    }
    return str;
  };

  return (
    <div className="root leaders">
      <img className="bg" src={bg.normal} alt="bg" />
      <img className="main-logo" src={logo} alt="logo" />
      <div className="leaders-container">
        {leaders.map((item, index) => (
          <div
            className={`leader ${item.id === user.id ? "you" : ""}`}
            key={item.name}
          >
            <p>
              {index + 1}.{" "}
              {maskForName(
                item.first_name ? item.first_name : "",
                item.last_name ? item.last_name : "",
                item.name ? item.name : ""
              )}{" "}
              {getMedal(index)}
            </p>
            <p>{item.points}</p>
          </div>
        ))}
        {number > 10 && (
          <div className={`leader you`} key={user.id}>
            <p>
              {number}.{" "}
              {maskForName(user.first_name, user.last_name, user.name)}
            </p>
            <p>{user.cards.reduce((accum, item) => accum + item.level, 0)}</p>
          </div>
        )}
        {user.personalNumber === 0 && (
          <p className="you">Авторизуйся, чтобы попасть в таблицу</p>
        )}
      </div>
      <Button
        title={"Назад"}
        disable={false}
        onClick={() => navigate("/main")}
      />
    </div>
  );
};
