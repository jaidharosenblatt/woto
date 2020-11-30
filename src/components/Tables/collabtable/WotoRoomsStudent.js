import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { convertDiscussionsToColumns } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";
import actions from "../../../redux/courses";
import selectors from "../../../redux/courses/selectors";
import { connect } from "react-redux";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsStudent = (props) => {
  const authContext = useContext(AuthContext);
  const { requiredFields } = seperateFields(props.course);
  const userID = authContext.state.user._id;

  const joinDiscussion = (discussion) => {
    props.joinDiscussion(props.courseID, userID, discussion._id);
  };

  const converted = convertDiscussionsToColumns(
    props.discussions,
    authContext,
    requiredFields
  );

  const { activeDiscussion } = props;
  const colParams = { activeDiscussion, userID, joinDiscussion };

  return (
    <SearchTable
      data={[...converted]}
      course={props.course}
      loading={props.loading}
      colParams={colParams}
    />
  );
};

const mapStateToProps = (state, { courseID }) => {
  return {
    course: selectors.getCourse(state, courseID),
    discussions: selectors.getDiscussions(state, courseID),
    loading: selectors.getLoading(state, courseID),
    activeDiscussion: selectors.getActiveDiscussion(state, courseID),
    courseID,
  };
};

export default connect(mapStateToProps, {
  ...actions.joinDiscussion,
})(WotoRoomsStudent);
