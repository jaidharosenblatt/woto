import React from "react";
import util from "../../util";
import SearchTable from "../analytics/tables/questionTable/SearchTable";
import { joinDiscussion } from "../../redux/courses/actions/wotos";
import selectors from "../../redux/selectors";
import { connect } from "react-redux";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsTable = (props) => {
  const { userID } = props;

  const converted = util.convertDiscussionsToColumns(
    props.discussions,
    userID,
    props.course.questionTemplate
  );

  return <SearchTable data={[...converted]} />;
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    discussions: selectors.getDiscussions(state),
    userID: selectors.getUserID(state),
  };
};

export default connect(mapStateToProps, {
  joinDiscussion,
})(WotoRoomsTable);
