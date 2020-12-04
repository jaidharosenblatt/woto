import React from "react";
import util from "../../../util/";
import SearchTable from "./SearchTable";
import { joinDiscussion } from "../../../redux/courses/actions/wotos";
import selectors from "../../../redux/selectors";
import { connect } from "react-redux";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsStudent = (props) => {
  const { userID } = props;

  const _joinDiscussion = async (discussion) => {
    await props.joinDiscussion(discussion._id);
  };

  const converted = util.convertDiscussionsToColumns(
    props.discussions,
    userID,
    props.course.questionTemplate
  );

  const { activeDiscussion } = props;
  const colParams = { activeDiscussion, userID, _joinDiscussion };

  return (
    <SearchTable
      data={[...converted]}
      course={props.course}
      loading={props.loading}
      colParams={colParams}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    discussions: selectors.getDiscussions(state),
    loading: selectors.getLoading(state),
    userID: selectors.getUserID(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
  };
};

export default connect(mapStateToProps, {
  joinDiscussion,
})(WotoRoomsStudent);
