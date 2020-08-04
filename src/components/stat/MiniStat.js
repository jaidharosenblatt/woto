import React from "react";
import { Row, Col, Space } from "antd";
import "./Stat.css";
const MiniStat = ({ label, icon, text, unit }) => {
  return (
    <Row gutter={4} align="middle" className="mini-stat">
      <Col span={8} align="center">
        {icon}
      </Col>
      <Col span={16}>
        <Space direction="vertical">
          <p> {label} </p>
          <b>{text}</b>
          <h3>{unit}</h3>
        </Space>
      </Col>
    </Row>
  );
};

export default MiniStat;
