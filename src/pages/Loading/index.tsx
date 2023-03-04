import React from "react";

import "./Loading.scss";
import bg from "../../assets/image/bg-load.png";
import logo from "../../assets/image/logo-load.png";
import { Navigate } from "react-router-dom";

export const Loading: React.FC = () => {
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
    return <Navigate to={"/rules"} replace={true} />;
  }

  return (
    <div className="root">
      <img className="bg" src={bg} alt="bg" />
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
