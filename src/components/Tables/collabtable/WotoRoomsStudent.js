import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { convertDiscussionsToColumns } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";
import redux from "../../../redux/courses";
import { connect } from "react-redux";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsStudent = (props) => {
  const { courses, courseID } = props;
  const { course, discussions, loading, activeDiscussion } = redux.select(
    courses,
    courseID
  );
  const authContext = useContext(AuthContext);
  const { requiredFields } = seperateFields(course);
  const userID = authContext.state.user._id;

  const joinDiscussion = (discussion) => {
    props.joinDiscussion(courseID, userID, discussion._id);
  };

  const converted = convertDiscussionsToColumns(
    discussions,
    authContext,
    requiredFields
  );

  const colParams = { activeDiscussion, userID, joinDiscussion };

  return (
    <SearchTable
      data={[...converted]}
      course={course}
      loading={loading}
      colParams={colParams}
    />
  );
};

export default connect(redux.mapStateToProps, {
  ...redux.joinDiscussion,
})(WotoRoomsStudent);
