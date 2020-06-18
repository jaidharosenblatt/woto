import React from "react";
import "./Home.css";

const HomeHeader = (props) => {
  return (
    <div>
      <h1 className="HomeHeader">{props.title}</h1>
      <p className="HomeDescription">{props.description}</p>
    </div>
  );
};

export default HomeHeader;
