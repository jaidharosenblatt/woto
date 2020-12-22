import React from "react";
import { Card, Space, Col } from "antd";
import { connect } from "react-redux";
import { leaveQueue } from "../../redux/courses/actions/student";
import QueueInfo from "../student/QueueInfo";
import LeaveQueueButton from "../modals/buttons/LeaveQueueButton";
import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
import util from "../../util";
import LocationTimeTag from "../course/header/LocationTimeTag";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import selectors from "../../redux/selectors";
import TeachingStaffRow from "../course/teaching-staff/TeachingStaffRow";

const TAQueueStatus = (props) => {
  const { course, session } = props;
  return (
    <div className="help-header">
      <Card
        title={
          <>
            <LeftRightRow
              left={
                <QueueInfo
                  isTA={props.isTA}
                  course={course}
                  session={session}
                />
                // <Space direction="vertical">
                //   <h1>{course?.code}'s Office Hours</h1>
                //   {session && (
                //     <LocationTimeTag
                //       location={session?.location}
                //       time={`${util.convertTimeString(
                //         session?.startTime
                //       )} - ${util.convertTimeString(session?.endTime)}`}
                //     />
                //   )}
                // </Space>
              }
              right={props.TAButtons}
            />
          </>
        }
      ></Card>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
  };
};

export default connect(mapStateToProps, { leaveQueue })(TAQueueStatus);
