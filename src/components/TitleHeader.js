import React from "react";
import { Card, Row, Col } from "antd";
import "./components.css";

const TitleHeader = (props) => {
  return (
    <Row align="middle">
      <Col span={18}>
        <Card>
          <h1>{props.title}</h1>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6} align="right">
        <img className="Floating-Image" src={props.image} alt={props.alt} />
      </Col>
    </Row>
  );
};

export default TitleHeader;
