import React, { useContext } from "react";
import { Row, Col, Space, Button } from "antd";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import { ProblemImage } from "../../static/Images";
import "./Help.css";
import { HelpContext } from "../../contexts/HelpContext";
import { AuthContext } from "../../contexts/AuthContext";

const JoinQueue = ({ courseName, queueSize = 1 }) => {
  const { dispatch } = useContext(HelpContext);
  const authContext = useContext(AuthContext);

  const studentId = authContext.state.user._id;

  const handleJoin = () => {
    dispatch({
      type: "JOIN",
      payload: {
        queuePosition: queueSize,
        student: studentId,
      },
    });
  };

  const handleCollab = () => {
    dispatch({
      type: "COLLABORATE",
    });
  };

  return (
    <Row align="middle">
      <Col xs={24} md={12} align="middle">
        <img className="hero" src={ProblemImage} alt="waitng" />
      </Col>
      <Col xs={24} md={12} align="left">
        <Space direction="vertical" className="session-details">
          <div>
            <h1>{`${courseName} Office Hours`}</h1>
            <LocationTimeTag location="Virtual" time="Now until 4pm" />
          </div>
          <p>
            Reserve your spot now before submitting a question. You will still
            have the option to collaborate once you submit your question
          </p>
          <Button
            type="primary"
            onClick={handleJoin}
          >{`Join the TA Queue As #${queueSize}`}</Button>
          <p>
            Or, if you don't need help from a teaching assistant and are just
            looking to collaborate with peers
          </p>
          <Button
            onClick={handleCollab}
          >{`Join ${courseName}'s Woto Room`}</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default JoinQueue;
