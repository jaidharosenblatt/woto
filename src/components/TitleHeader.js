import React from "react";
import { Card, Row, Col } from "antd";
import "./components.css";

const TitleHeader = (props) => {
  return (
    <div className="Title-Header">
      <Card>
        <h1>{props.title}</h1>
        <p>Card content</p>
        <img className="Floating-Image" src={props.image} alt={props.alt} />
      </Card>
    </div>
  );
};

export default TitleHeader;
