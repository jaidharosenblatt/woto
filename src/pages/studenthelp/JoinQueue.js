import React from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage, Encourage } from "../../static/Images";
import "./Help.css";

const JoinQueue = ({ setStage, course, queueSize = 1 }) => {
  return (
    <div className="join-queue-wrapper">
      <Row className="join-queue" align="middle">
        <Col xs={24} sm={12}>
          <Card>
            <div className="card-details">
              <img className="hero" src={PresentationImage} alt="waitng" />
              <Space direction="vertical">
                <h1>Office Hours Until 4pm</h1>
                <p>
                  Reserve your spot to work with a TA now and join the Woto Room
                  later question
                </p>
                <Button
                  type="primary"
                  block
                  onClick={() => setStage("submit")}
                >{`Join the Queue As #${queueSize}`}</Button>
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <div className="card-details">
              <img className="hero" alt="working together" src={Encourage} />
              <Space direction="vertical" className="session-details">
                <h1>Woto Room</h1>
                <p>
                  If you don't need help from a teaching assistant and want to
                  go straight to working together with peers
                </p>
                <Button
                  type="primary"
                  block
                  onClick={() => setStage("collab")}
                >{`Join ${course.code}'s Woto Room`}</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JoinQueue;
