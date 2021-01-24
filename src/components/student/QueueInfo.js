import React from "react";
import { Space } from "antd";
import util from "../../util";
import LocationTimeTag from "../course/header/LocationTimeTag";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

const QueueInfo = (props) => {
  return (
    <Space direction="vertical">
      <h2>{props.course?.code}'s Office Hours</h2>

      <LocationTimeTag
        ta
        location={props.session?.location}
        time={`${util.convertTimeString(
          props.session?.startTime
        )} - ${util.convertTimeString(props.session?.endTime)}`}
      />

      <a
        rel="noopener noreferrer" // js warning
        target="_blank"
        href={props.meetingURL}
        style={{ fontSize: 12 }}
      >
        {props.meetingURL}
      </a>
    </Space>
  );
};
const mapStateToProps = (state) => ({
  course: selectors.getCourse(state),
  session: selectors.getSession(state),
  meetingURL: selectors.getUserMeetingURL(state),
});
export default connect(mapStateToProps)(QueueInfo);
