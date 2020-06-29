import React from "react";
import { Card, Row, Col, Space } from "antd";

const styles = {
  card: {
    lineHeight: 1.25,
    backgroundColor: "#ffffff",
    padding: "10px",
    //border: "1px solid #91D5FF",
    height: "100%",
  },

  paragraph: {
    fontSize: 40,
    color: "#000000",
    fontColor: "#404040",
    fontFamily: "DM Sans"
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
  
      <Row justify="center" align='bottom'>
        <Col span={24} align="middle">
        <h6 >
          {title}
        </h6>
        </Col>
        
      </Row>
      <Row gutter={10} justify="center" align="middle">
        <Col sm={11} lg={9} md={9} xl={9} align="right">
          <img style={styles.data} alt={alt} src={image} />
        </Col>
        <Col sm={13} lg={15} md={15} xl={15} align="left">
          <p className="Data" style={styles.paragraph}>
            {value}
          </p>
        </Col>
      </Row>
      
    </Card>
  );
};

export default StatWithIconCard;

/*
        <Col span={14} align="left">
          <p className="Data" style={styles.paragraph}>
            
            {value}
          </p>
        </Col>
*/