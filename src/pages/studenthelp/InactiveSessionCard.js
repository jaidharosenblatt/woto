import React from "react";
import { Row, Col, Space } from "antd";
import { WaitingImage } from "../../static/Images";
import "./Help.css";

const InactiveSessionCard = ({ courseName }) => {
  return (
    <Row align="middle">
      <Col sm={24} md={12} align="right">
        <img className="inactive-image" src={WaitingImage} alt="waitng" />
      </Col>
      <Col sm={24} md={12} align="left">
        <Space direction="vertical" size={2}>
          <h1>{`${courseName} Office Hours`}</h1>
          <h2>No Active Sessions</h2>
          <h3>
            Asking a question is disabled while no active session is occuring
          </h3>
        </Space>
      </Col>
    </Row>
  );
};

export default InactiveSessionCard;
