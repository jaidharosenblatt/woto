import React from "react";
import { Alert, Card } from "antd";
import WotoRoomsStudent from "./WotoRoomsTable";
import TitleHeader from "../sessions/header/TitleHeader";
import WotoGroup from "./WotoGroup";
import AddWotoButton from "../modals/buttons/AddWotoButton";
import {
  postDiscussion,
  loadDiscussions,
} from "../../redux/courses/actions/wotos";
import { connect } from "react-redux";
import util from "../../util";
import selectors from "../../redux/selectors";
import { useHistory } from "react-router-dom";
import NavBarCentered from "../util-components/centeredpage/NavBarCentered";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = (props) => {
  const { course, session, activeDiscussion } = props;
  const courseID = props.course?._id;
  const history = useHistory();
  return (
    <NavBarCentered>
      {session && (
        <Alert
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/courses/${courseID}/session`)}
          message={`There is an active office hours session from now until ${util.convertTimeString(
            session.endTime
          )}. Click here to join!`}
          type="success"
        />
      )}
      <TitleHeader
        title={`${course.code}'s Woto Rooms`}
        details="Open video rooms for you to collaborate with students on classwork"
      />

      {course?.collabSize && (
        <Alert
          message={`According to your ${course.code}'s collaboration policy, a maximum of ${course.collabSize} students should
              be in a Woto Room at a time.`}
          type="info"
        />
      )}

      {activeDiscussion && <WotoGroup />}

      <Card bodyStyle={{ padding: 0 }}>
        <WotoRoomsStudent />
      </Card>
      <div style={{ margin: 8 }}>
        {!activeDiscussion && (
          <AddWotoButton handleSubmit={props.postDiscussion} />
        )}
      </div>
    </NavBarCentered>
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
