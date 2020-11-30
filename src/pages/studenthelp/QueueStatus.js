import React, { useContext } from "react";
import { Card, Space } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import actions from "../../redux/courses/actionCreators";

import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
import { convertTimeString } from "../../utilfunctions/timeAgo";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import selectors from "../../redux/courses/selectors";

const QueueStatus = (props) => {
  const authContext = useContext(AuthContext);
  const { course, session } = props;
  const courseID = course?._id;

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
                handleLeave={() =>
                  props.leaveQueue(courseID, authContext.state?.user._id)
                }
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
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
  };
};
const { leaveQueue } = actions;

export default connect(mapStateToProps, { leaveQueue })(QueueStatus);
