import React from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage, TalkingImage } from "../../static/LoadedImages";

import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { convertDateString } from "../../utilfunctions/timeAgo";

/**
 *
 * @param {props} course course for this session
 * @param {props} session active session if there is one
 * @param {props} description fields describing question/submission
 * @param {props} setDescription callback to set description
 * @param {props} discussion woto room submission
 * @param {props} setDiscussion callback to woto room
 * @param {props} setStage change the state of the page
 * @param {props} postDiscussion callback to join the woto room
 * @param {props} postQuestion callback to join TA queue
 * @param {props} patchQuestion callback to edit TA answer
 * 
 * course,
    session,
    description,
    setDescription,
    discussion,
    question,
    setStage,
    postDiscussion,
    joinQueue,
    submitQuestion,
 */
const JoinQueue = (props) => {
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
                  {props.session &&
                    props.session.endTime &&
                    `Until ${convertDateString(props.session.endTime)}`}
                </h1>
                <p>
                  Reserve your spot to work with a TA. You can still join the
                  Woto Room while you wait
                </p>
                <Button
                  type="primary"
                  block
                  onClick={props.joinQueue}
                >{`Join ${props.course &&
                  props.course.code}'s Queue As #1`}</Button>
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
                  onClick={props.joinWoto}
                >{`Join ${props.course &&
                  props.course.code}'s Woto Rooms`}</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </NavBarCentered>
  );
};

export default JoinQueue;
