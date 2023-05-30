import React from "react";
import "./Button.scss";

export const Button: React.FC<{
  title: string;
  disable: boolean;
  onClick: () => void;
}> = ({ title, onClick, disable }) => {
  return (
    <button
      className={`button ${disable ? " disabled" : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
