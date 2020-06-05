import React from "react";
import { Card } from "antd";
import "./components.css";

const TitleHeader = (props) => {
  return (
    <div className="TitleHeader">
      <Card>
        <h1>{props.title}</h1>
        {props.details}
        <img className="FloatingImage" src={props.image} alt={props.alt} />
      </Card>
    </div>
  );
};

export default TitleHeader;
