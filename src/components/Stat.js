import React from "react";
import { Card, Row } from "antd";
import "./components.css";

const Stat = ({ title, value, footer, image, alt }) => {
  return (
    <Card style={{ backgroundColor: "#DDF0FF" }}>
      <Row justify="center">
        <img alt={alt} src={image} />
        <p className="StatHeader">{title}</p>
      </Row>
      <Row justify="center">
        <p className="StatData">{value}</p>
      </Row>
      <Row justify="center">
        <p className="StatHeader">{footer}</p>
      </Row>
    </Card>
  );
};

export default Stat;
