import React from "react";
import "./ButtonGray.scss";

export const ButtonGray: React.FC<{
  title: string;
  disabled: boolean;
  onClick: () => void;
}> = ({ title, disabled, onClick }) => {
  return (
    <button className={`btn ${disabled ? " disabled" : ""}`} onClick={onClick}>
      {title}
    </button>
  );
};
