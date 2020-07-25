import React, { useEffect, useContext } from "react";
import { Row, Col, Alert } from "antd";

import API from "../../api/API";
import { AuthContext } from "../../contexts/AuthContext";

import CollabTable from "../../components/Tables/collabtable/CollabTable";
import TitleHeader from "../../components/header/TitleHeader";
import VideoRoomUrl from "../../components/form/VideoRoomUrl";
import JoinWotoButton from "../../components/buttons/JoinWotoButton";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 * @param {props} course course object
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 */
const WotoRoom = (props) => {
  const { state } = useContext(AuthContext);
  const courseId = props.course._id;
  const askQuestion = props.setQuestion;

  // Check if user has already created an active room
  useEffect(() => {
    async function getData() {
      const res = await API.getWotoData(courseId);
      res.forEach((item) => {
        if (item.owner._id === state.user._id && !item.archived) {
          askQuestion(item);
          console.log(item);
          return;
        }
      });
    }
    getData();
  }, [askQuestion, courseId, state.user._id]);
  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title={`${props.course.code} Woto Room`}
          details={
            <h3>
              Woto Rooms are a 24/7 space for you to work with others on
              assignments.
            </h3>
          }
        />
        {props.course.activeSession ? (
          <Alert
            style={{ cursor: "pointer" }}
            onClick={() => props.setStage("")}
            message="There is an active office hours session from now until 4pm. Click here to join!"
            type="success"
          />
        ) : (
          <Alert
            message={`There are no active office hour sessions for ${props.course.code} right now`}
            type="warning"
          />
        )}
      </Col>
      <Col span={24}>
        <CollabTable {...props} />
        {!props.question && (
          <JoinWotoButton
            handleSubmit={(values) => props.askQuestion(values)}
            extraFields={<VideoRoomUrl />}
            CTA={`Join ${props.course.code}'s Woto Room`}
          />
        )}
      </Col>
    </Row>
  );
};

export default WotoRoom;
