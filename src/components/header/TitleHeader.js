import React from "react";
import { Card } from "antd";
import "./header.css";

const TitleHeader = (props) => {
  return (
    <Card>
      <h1>{props.title}</h1>
      <div> {props.details}</div>
      <img className="FloatingImage" src={props.image} alt={props.alt} />
    </Card>
  );
};

export default TitleHeader;
