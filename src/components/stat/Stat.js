import React from "react";
import { Card, Row } from "antd";
import "./Stat.css";

const styles = {
  card: {
    lineHeight: 1.25,
    backgroundColor: "#DDF0FF",
    padding: "0px",
    border: "1px solid #91D5FF",
  },
};
/**
 * Card for highlighting metrics
 * @param title metric name ex "Wait Time"
 * @param value metric value to display ex "25"
 * @param footer metric unit ex "minutes"
 * @param image icon ex "clock.svg"
 */
const Stat = ({ title, value, footer, image }) => {
  return (
    <Card className="stat-card" style={styles.card}>
      <Row justify="center">
        {image}
        <p className="Header">{title}</p>
      </Row>
      <Row justify="center" align="middle">
        <p className="Body">{value}</p>
      </Row>
      <Row justify="center">
        <p className="Footer">{footer}</p>
      </Row>
    </Card>
  );
};

export default Stat;
