import React from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage, TalkingImage } from "../../static/LoadedImages";

import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { convertDateString } from "../../utilfunctions/timeAgo";

const JoinQueue = ({ joinQueue, setStage, course, queueSize = 1, endTime }) => {
  return (
    <NavBarCentered>
      <Row className="join-queue" align="middle">
        <Col xs={24} sm={12}>
          <Card>
            <div className="card-details">
              <PresentationImage className="hero" />
              <Space direction="vertical">
                <h1>
                  Office Hours{" "}
                  {endTime && `Until ${convertDateString(endTime)}`}
                </h1>
                <p>
                  Reserve your spot to work with a TA. You can still join the
                  Woto Room while you wait
                </p>
                <Button
                  type="primary"
                  block
                  onClick={joinQueue}
                >{`Join ${course.code}'s Queue As #${queueSize}`}</Button>
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <div className="card-details">
              <TalkingImage className="hero" />
              <Space direction="vertical" className="session-details">
                <h1>Woto Rooms</h1>
                <p>
                  Go straight to working together with peers if you don't need
                  help from a TA
                </p>
                <Button
                  type="primary"
                  block
                  onClick={() => setStage("collab")}
                >{`Join ${course.code}'s Woto Rooms`}</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </NavBarCentered>
  );
};

export default JoinQueue;
