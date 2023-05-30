import React from "react";
import "./Auth.scss";
import logo from "../../assets/image/logo-auth.png";
import { ButtonGray } from "../../components/ButtonGray";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "../../components/ButtonLink";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setUserNumber } from "../../redux/game/asyncActions";
import { setPage } from "../../redux/game/slice";

export const Auth: React.FC = () => {
  const [number, setNumber] = React.useState<string>("");
  const user = useAppSelector((state) => state.game.user);
  const bg = useAppSelector((state) => state.game.bg);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 8) return;
    setNumber(e.target.value.replace(/\D/, ""));
  };

  const setPersonalNumber = () => {
    dispatch(setUserNumber({ id: user.id, personalNumber: number }));
    dispatch(setPage(1));
    navigate("/main");
  };

  return (
    <div className="root auth">
      <img className="bg" src={bg.normal} alt="bg" />
      <img className="auth-logo" src={logo} alt="logo" />
      <div className="container">
        <p className="text">
          Введи номер личного кабинета в PARI, чтобы участвовать в розыгрыше
          призов. Или зарегистрируйся по ссылке и получай фрибет 1000 рублей,
          если еще не сделал этого 🙂
        </p>
      </div>
      <div className="auth-btns">
        <ButtonLink title={"Регистрация"} />
        <div className="auth-btn-container">
          <Input
            value={number}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => toggleInput(e)}
          />
          <ButtonGray
            title={"Готово"}
            disabled={number.length < 8}
            onClick={setPersonalNumber}
          />
        </div>
        <ButtonGray
          title={"Назад"}
          disabled={false}
          onClick={() => {
            navigate("/rules");
          }}
        />
      </div>
    </div>
  );
};
