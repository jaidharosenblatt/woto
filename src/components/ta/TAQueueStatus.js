import React from "react";
import { Card, Space, Col } from "antd";
import { connect } from "react-redux";
import { leaveQueue } from "../../redux/courses/actions/student";
import MakeAnnouncementButton from "../modals/buttons/MakeAnnouncementButton";
import TAEndSessionButton from "../modals/buttons/TAEndSessionButton";
import TASignOffButton from "../modals/buttons/TASignOffButton";
import QueueInfo from "../student/QueueInfo";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import selectors from "../../redux/selectors";
import "./TAQueueStatus.css";
import {
  closeSession,
  leaveSession,
  makeAnnouncement,
} from "../../redux/courses/actions/ta";

/**
 * Creates a header for a TA Session
 * @Huvon Hutchinson-Goodridge
 */

const TAQueueStatus = (props) => {
  const { course, session } = props;
  return (
    <Col span={24}>
      <Card
        className="Disappear"
        title={
          <div>
            <Col className="HeaderWrapper" span={24}>
              <Col className="HeaderText" span={24}>
                <LeftRightRow
                  left={
                    <Space direction="vertical">
                      <QueueInfo course={course} session={session} />
                    </Space>
                  }
                  right={
                    <div>
                      <Space direction="horizontal" align="middle">
                        <div>
                          <MakeAnnouncementButton
                            course={course?.code}
                            onSubmit={async (message, meetingURL) =>
                              await props.makeAnnouncement(message, meetingURL)
                            }
                          />
                        </div>
                        <div style={{ width: 165 }}>
                          {session?.staffers?.length > 1 ? (
                            <TASignOffButton onSubmit={props.leaveSession} />
                          ) : (
                            <TAEndSessionButton onSubmit={props.closeSession} />
                          )}
                        </div>
                      </Space>
                    </div>
                  }
                />
              </Col>
            </Col>
          </div>
        }
      />
    </Col>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
  };
};

export default connect(mapStateToProps, {
  leaveQueue,
  closeSession,
  leaveSession,
  makeAnnouncement,
})(TAQueueStatus);
