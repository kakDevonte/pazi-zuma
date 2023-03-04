import React from "react";
import "./Auth.scss";
import bg from "../../assets/image/bg-big.png";
import logo from "../../assets/image/logo-auth.png";
import { Button } from "../../components/Button";
import { ButtonGray } from "../../components/ButtonGray";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";

export const Auth: React.FC = () => {
  const [number, setNumber] = React.useState<string>("");
  const navigate = useNavigate();

  const toggleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 8) return;
    setNumber(e.target.value.replace(/\D/, ""));
  };

  return (
    <div className="root auth">
      <img className="bg" src={bg} alt="bg" />
      <img className="auth-logo" src={logo} alt="logo" />
      <div className="container">
        <p className="text">
          Введи номер личного кабинета в PARI, чтобы участвовать в розыгрыше
          призов. Или зарегистрируйся по ссылке и получай фрибет 1000 рублей,
          если еще не сделал этого 🙂
        </p>
      </div>
      <div className="auth-btns">
        <Button title={"Регистрация"} onClick={() => {}} />
        <div className="auth-btn-container">
          <Input
            value={number}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => toggleInput(e)}
          />
          <ButtonGray
            title={"Готово"}
            disabled={number.length < 8}
            onClick={() => {}}
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
      <div className="auth-top"></div>
      <div className="auth-bot"></div>
    </div>
  );
};
