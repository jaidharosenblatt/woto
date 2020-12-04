import React from "react";
import { Row, Col, Alert, Card } from "antd";
import WotoRoomsStudent from "../../../components/Tables/collabtable/WotoRoomsStudent";
import TitleHeader from "../../../components/header/TitleHeader";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import DataHeader from "./discussioncard/DataHeader";
import YourQuestion from "./discussioncard/YourQuestion";
import WotoGroup from "./WotoGroup";
import AddWotoButton from "../../../components/buttons/AddWotoButton";
import actions from "../../../redux/courses";
import { connect } from "react-redux";
import util from "../../../util";
import selectors from "../../../redux/selectors";
import { useHistory } from "react-router-dom";
/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = (props) => {
  const { course, userID, session, activeDiscussion, loading } = props;
  const courseID = props.course?._id;
  const history = useHistory();
  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title="Woto Rooms"
          details="Open video rooms for you to collaborate with students on classwork"
        />
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
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
    loading: selectors.getLoading(state),
    userID: selectors.getUserID(state),
  };
};

const { setBypassSession, postDiscussion, loadDiscussions } = actions;

export default connect(mapStateToProps, {
  setBypassSession,
  postDiscussion,
  loadDiscussions,
})(WotoRoom);
