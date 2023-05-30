import React from "react";

import "./Loading.scss";
import logo from "../../assets/image/logo-load.png";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export const Loading: React.FC = () => {
  const user = useAppSelector((state) => state.game.user);
  const bg = useAppSelector((state) => state.game.bg);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] =
    React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setUploadOrDownloadCount(
        (beforeValue) => beforeValue + 7 //randomIntFromInterval(2, 8)
      );
    }, 140);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (uploadOrDownloadCount >= 100) {
    return <Navigate to={user.isGame ? "/main" : "/rules"} replace={true} />;
  }

  return (
    <div className="root">
      <img className="bg" src={bg.load} alt="bg" />
      <img className="load-logo" src={logo} alt="logo" />
      <span className="load-text">{`${Math.round(
        uploadOrDownloadCount >= 100 ? 100 : uploadOrDownloadCount
      )}%`}</span>
      <div className="load-bar">
        <div className="load-bar-anim"></div>
      </div>
      <div className="load-bot"></div>
    </div>
  );
};
