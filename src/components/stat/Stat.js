import React from "react";
import { Card, Row } from "antd";
import "./Stat.css";

/**
 * Card for highlighting metrics
 * @param title metric name ex "Wait Time"
 * @param value metric value to display ex "25"
 * @param footer metric unit ex "minutes"
 * @param image icon ex "clock.svg"
 */
const Stat = ({ title, value, footer, image, alt }) => {
  return (
    <Card
      style={{
        lineHeight: 1.25,
        backgroundColor: "#DDF0FF",
        padding: "0px",
        border: "1px solid #91D5FF",
      }}
    >
      <Row justify="center">
        <img alt={alt} src={image} />
        <p className="Header">{title}</p>
      </Row>
      <Row justify="center" align="middle">
        <p className="Data">{value}</p>
      </Row>
      <Row justify="center">
        <p className="Footer">{footer}</p>
      </Row>
    </Card>
  );
};

export default Stat;
