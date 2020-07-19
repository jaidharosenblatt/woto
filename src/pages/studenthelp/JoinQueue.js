import React from "react";
import { Row, Col, Space, Button, Card } from "antd";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import { PresentationImage, Encourage } from "../../static/Images";
import "./Help.css";

const JoinQueue = ({ setStage, course, queueSize = 1 }) => {
  return (
    <div className="join-queue-wrapper">
      <Row className="join-queue" align="middle">
        <Col xs={24} md={12}>
          <Card>
            <img className="hero" src={PresentationImage} alt="waitng" />
            <div className="session-details">
              <Space direction="vertical">
                <h1>Office Hours</h1>
                {/* <LocationTimeTag location="Virtual" time="Now until 4pm" /> */}
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
        <Col xs={24} md={12}>
          <Row style={{ height: "100%" }} align="bottom">
            <Card>
              <img className="hero" alt="working together" src={Encourage} />
              <Space direction="vertical" className="session-details">
                <h1>Woto Room</h1>
                <p>
                  If you don't need help from a teaching assistant and are just
                  looking to work together with peers
                </p>
                <Button
                  block
                  onClick={() => setStage("collab")}
                >{`Join ${course.code}'s Woto Room`}</Button>
              </Space>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default JoinQueue;
