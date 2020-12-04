import React from "react";
import { Row, Col, Alert, Card } from "antd";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import TitleHeader from "../../../components/header/TitleHeader";

import YourQuestion from "./discussioncard/YourQuestion";
import WotoGroup from "./WotoGroup";
import AddWotoButton from "../../../components/buttons/AddWotoButton";
import {
  postDiscussion,
  loadDiscussions,
} from "../../../redux/courses/student";
import { connect } from "react-redux";
import util from "../../../util";
import selectors from "../../../redux/selectors";
import { useHistory } from "react-router-dom";
/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = (props) => {
  const { course, session, activeDiscussion } = props;
  const courseID = props.course?._id;
  const history = useHistory();
  return (
    <Row align="center">
      <Col span={24}>
        {session && (
          <Alert
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/${courseID}/session`)}
            message={`There is an active office hours session from now until ${util.convertTimeString(
              session.endTime
            )}. Click here to join!`}
            type="success"
          />
        )}
        <TitleHeader
          title="Woto Rooms"
          details="Open video rooms for you to collaborate with students on classwork"
        />

        {course?.collabSize && (
          <Alert
            message={`According to your Professor's collaboration policy, a maximum of ${course.collabSize} students can
              be in a Woto Room at a time.`}
            type="info"
          />
        )}

        {activeDiscussion && (
          <Row className="group-interaction">
            <Col xs={24} md={8}>
              <YourQuestion />
            </Col>
            <Col xs={24} md={16}>
              <WotoGroup />
            </Col>
          </Row>
        )}

        <Card bodyStyle={{ padding: 0 }}>
          <WotoRoomsStudent />
        </Card>
        <div style={{ margin: 8 }}>
          {!activeDiscussion && (
            <AddWotoButton handleSubmit={props.postDiscussion} />
          )}
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
  };
};

export default connect(mapStateToProps, {
  postDiscussion,
  loadDiscussions,
})(WotoRoom);
