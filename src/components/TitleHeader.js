import React from "react";
import { Card, Row, Col } from "antd";
import "./components.css";

const TitleHeader = (props) => {
  return (
    <div className="TitleHeader">
      <Card>
        <h1>{props.title}</h1>
        {props.details}
        <div className="FloatingImage"> {props.image}</div>
      </Card>
    </div>
  );
};

export default TitleHeader;
