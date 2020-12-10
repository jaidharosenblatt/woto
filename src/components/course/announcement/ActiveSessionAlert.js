import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "antd";

import util from "../../../util";
import selectors from "../../../redux/selectors";

const ActiveSessionAlert = (props) => {
  const history = useHistory();
  if (props.session) {
    return (
      <Alert
        style={{ cursor: "pointer" }}
        onClick={() => history.push(`/courses/${props.courseID}/session`)}
        message={`There is an active office hours session from now until ${util.convertTimeString(
          props.session.endTime
        )}. Click here to join!`}
        type="success"
      />
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    courseID: selectors.getCourseID(state),
    session: selectors.getSession(state),
  };
};

export default connect(mapStateToProps)(ActiveSessionAlert);
