import React from "react";
import { Row, Col, Space, Button } from "antd";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import { ProblemImage } from "../../static/Images";
import "./Help.css";

const JoinQueue = ({ courseName, queueSize = 1, handleJoin }) => {
  return (
    <Row align="middle">
      <Col xs={24} md={12} align="middle">
        <img className="inactive-image" src={ProblemImage} alt="waitng" />
      </Col>
      <Col xs={24} md={12} align="left">
        <Space direction="vertical" className="join-queue">
          <h1>{`${courseName} Office Hours`}</h1>
          <LocationTimeTag location="Virtual" time="Now until 4pm" />

          <h3>Reserve your spot now and submit your question later</h3>
          <Button
            type="primary"
            size="large"
            onClick={handleJoin}
          >{`Join the Queue as #${queueSize}`}</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default JoinQueue;
