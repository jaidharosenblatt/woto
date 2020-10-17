import React, { useContext } from "react";
import { Card, Space } from "antd";
import { CourseContext } from "./util/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import { leaveQueue, select } from "../../ducks/courses";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
import { convertTimeString } from "../../utilfunctions/timeAgo";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";

const QueueStatus = (props) => {
  const courseID = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const { course, session } = select(props.courses, courseID);

  return (
    <div className="help-header">
      <Card
        title={
          <LeftRightRow
            left={
              <Space direction="vertical">
                <h1>{course?.code}'s Office Hours</h1>
                {session && (
                  <LocationTimeTag
                    location={session?.location}
                    time={`${convertTimeString(
                      session?.startTime
                    )} - ${convertTimeString(session?.endTime)}`}
                  />
                )}
              </Space>
            }
            right={
              <LeaveQueueButton
                handleLeave={props.leaveQueue(
                  courseID,
                  authContext.state?.user._id
                )}
              />
            }
          />
        }
      >
        <WaitQueueStatMiniCards />
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

export default connect(mapStateToProps, { leaveQueue })(QueueStatus);
