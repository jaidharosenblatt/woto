import React from "react";
import { Card, Row, Col } from "antd";

const styles = {
  card: {
    lineHeight: 1.25,
    backgroundColor: "#ffffff",
    padding: "0px",
    border: "1px solid #91D5FF",
    height: "100%",
  },

  paragraph: {
    color: "#000000",
  },
  data: {
    color: "#000000",
  },
};
/**
 * Card for highlighting metrics
 * @param title metric name ex "Wait Time"
 * @param value metric value to display ex "25"
 * @param footer metric unit ex "minutes"
 * @param image icon ex "clock.svg"
 */
const StatWithIconCard = ({ title, value, footer, image, alt }) => {
  return (
    <Card style={styles.card}>
      <Row justify="center">
        <p className="Header" style={styles.paragraph}>
          {title}
        </p>
      </Row>
      <Row gutter={10} justify="center" align="middle">
        <Col span={12} align="right">
          <img style={styles.data} alt={alt} src={image} />
        </Col>
        <Col span={12} align="left">
          <p className="Data" style={styles.paragraph}>
            {" "}
            {value}{" "}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default StatWithIconCard;
