import React from "react";
import { Card, Row, Col } from "antd";
import "./header.css";

const TitleHeader = (props) => {
  return (
    <Card>
      <img className="FloatingImage" src={props.image} alt={props.alt} />
      <div className="HeaderWrapper">
        <div className="HeaderText">
          <h1>{props.title}</h1>
          {props.details}
        </div>
      </div>
    </Card>
  );
};

export default TitleHeader;
