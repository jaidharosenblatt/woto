import React from "react";
import { Card, Row, Col } from "antd";
import "./components.css";

const TitleHeader = (props) => {
  return (
    <div className="TitleHeader">
      <Card>
        <div className="Title">{props.title}</div>
        {props.details}
        <img className="FloatingImage" src={props.image} />
      </Card>
    </div>
  );
};

export default TitleHeader;
