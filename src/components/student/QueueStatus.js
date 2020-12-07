import React from "react";
import { Card, Space } from "antd";
import { connect } from "react-redux";
import { leaveQueue } from "../../redux/courses/actions/student";

import LeaveQueueButton from "../modals/buttons/LeaveQueueButton";
import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
import util from "../../util";
import LocationTimeTag from "../sessions/header/LocationTimeTag";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import selectors from "../../redux/selectors";

const QueueStatus = (props) => {
  const { course, session } = props;

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
                    time={`${util.convertTimeString(
                      session?.startTime
                    )} - ${util.convertTimeString(session?.endTime)}`}
                  />
                )}
              </Space>
            }
            right={<LeaveQueueButton handleLeave={() => props.leaveQueue()} />}
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

export default connect(mapStateToProps, { leaveQueue })(QueueStatus);
