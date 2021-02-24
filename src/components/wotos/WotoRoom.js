import React from "react";
import { Alert, Card } from "antd";
import WotoRoomsStudent from "./WotoRoomsTable";
import TitleHeader from "../course/header/TitleHeader";
import WotoGroup from "./WotoGroup";
import AddWotoButton from "../modals/buttons/AddWotoButton";
import {
  postDiscussion,
  loadDiscussions,
} from "../../redux/courses/actions/wotos";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import NavBarCentered from "../util-components/centeredpage/NavBarCentered";
import ActiveSessionAlert from "../course/announcement/ActiveSessionAlert";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const WotoRoom = (props) => {
  const { course, activeDiscussion, activeQuestion } = props;

  return (
    <NavBarCentered>
      <ActiveSessionAlert />
      <TitleHeader
        title={`${course.code}'s Woto Rooms`}
        details="Open video rooms for you to collaborate with students on classwork"
      />

      {course?.collabSize && (
        <Alert
          message={`According to ${course.code}'s collaboration policy, a maximum of ${course.collabSize} students should
              be in a Woto Room at a time and students should not share code`}
          type="info"
        />
      )}

      {activeDiscussion && <WotoGroup />}

      <Card bodyStyle={{ padding: 0 }}>
        <WotoRoomsStudent />
      </Card>
      <div style={{ margin: 8 }}>
        {!activeDiscussion && (
          <AddWotoButton
            handleSubmit={props.postDiscussion}
            question={activeQuestion?.description}
          />
        )}
      </div>
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps, {
  postDiscussion,
  loadDiscussions,
})(WotoRoom);
