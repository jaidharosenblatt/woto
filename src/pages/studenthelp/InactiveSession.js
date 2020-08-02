import React, { useState } from "react";
import { Row, Col, Alert } from "antd";

import CollabTable from "../../components/Tables/collabtable/CollabTable";
import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import GroupInteraction from "./GroupInteraction";
/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 * @param {props} course course object
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 * @param  {props} askQuestion
 */
const WotoRoom = (props) => {
  const [discussion, setDiscussion] = useState();

  const joinDiscussion = (value) => {
    console.log(value);
    setDiscussion(value);
  };

  // const closeDiscussion = () => {};

  // const kickPerson = () => {};
  console.log(props.question);
  return (
    <Row align="center">
      <Col span={24}>
        {props.course.activeSession ? (
          <>
            <TitleHeader
              title={`${props.course.code}'s Woto Rooms`}
              details={
                <h3>
                  Open video rooms for you to collaborate with students on
                  classwork
                </h3>
              }
            />
            <Alert
              style={{ cursor: "pointer" }}
              onClick={() => props.setStage("submit")}
              message="There is an active office hours session from now until 4pm. Click here to join!"
              type="success"
            />
          </>
        ) : (
          <>
            <TitleHeader
              title={props.course.code}
              details={<LocationTimeTag time={"No Active Sessions"} />}
            />
            <Alert
              message={`There are no active office hour sessions for ${props.course.code} right now. Try working together with peers`}
              type="warning"
            />
          </>
        )}
      </Col>
      <Col span={24}>
        <Alert
          message={`According to your Professor's collaboration policy, a maximum of ${
            props.course.sessionAttributes
              ? props.course.sessionAttributes.collabsize
              : 3
          } students can
              be in a Woto Room at a time.`}
          type="info"
        />
      </Col>
      <Col span={24}>
        {discussion && (
          <GroupInteraction
            discussion={discussion}
            course={props.course}
            question={props.question}
          />
        )}
      </Col>

      <Col span={24}>
        <CollabTable joinDiscussionCallBack={joinDiscussion} {...props} />
      </Col>
    </Row>
  );
};

export default WotoRoom;
