import React from "react";
import "./Input.scss";

export const Input: React.FC<{
  value: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onInput }) => {
  const onClickInput = () => {
    document.getElementById("login")?.focus();
  };

  return (
    <div className="input-root" onClick={onClickInput}>
      <input id="login" className="input" value={value} onInput={onInput} />
    </div>
  );
};
