import React from "react";
import "./Button.scss";
import { API } from "../../api/api";

export const ButtonLink: React.FC<{ title: string }> = ({ title }) => {
  const onClickRegistration = async () => {
    await API.clickRegisterButton();
  };

  return (
    <a
      className="button-link"
      href="https://i.pari.ru/ambassadors"
      target="_blank"
      onClick={onClickRegistration}
    >
      {title}
    </a>
  );
};
