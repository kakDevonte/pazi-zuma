import React from "react";
import "./Button.scss";

export const Button: React.FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
};
