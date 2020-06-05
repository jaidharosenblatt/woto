import React from "react";
import { Card } from "antd";
import "./components.css";

const TitleHeader = (props) => {
  return (
    <Card className="Card">
      <h1 className="TitleHeaderDetails">{props.title}</h1>
      <div className="TitleHeaderDetails"> {props.details}</div>
      <img className="FloatingImage" src={props.image} alt={props.alt} />
    </Card>
  );
};

export default TitleHeader;
