import React, { useContext } from "react";
import { Row, Col, Space, Button } from "antd";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import { ProblemImage } from "../../static/Images";
import "./Help.css";
import { HelpContext } from "../../contexts/HelpContext";
import { AuthContext } from "../../contexts/AuthContext";

const JoinQueue = ({ courseName, queueSize = 1 }) => {
  const { dispatch } = useContext(HelpContext);
  const { state } = useContext(AuthContext);

  const studentId = state.user._id;

  const handleJoin = () => {
    dispatch({
      type: "JOIN",
      payload: { queuePosition: 32, user: { ...studentId } },
    });
  };

  return (
    <Row align="middle">
      <Col xs={24} md={12} align="middle">
        <img className="inactive-image" src={ProblemImage} alt="waitng" />
      </Col>
      <Col xs={24} md={12} align="left">
        <Space direction="vertical" className="session-details">
          <h1>{`${courseName} Office Hours`}</h1>
          <LocationTimeTag location="Virtual" time="Now until 4pm" />

          <h3>Reserve your spot now and submit your question later</h3>
          <Button
            type="primary"
            size="large"
            onClick={handleJoin}
          >{`Join the Queue As #${queueSize}`}</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default JoinQueue;
