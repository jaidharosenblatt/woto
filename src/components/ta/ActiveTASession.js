import React from "react";
import { Row, Col, Space } from "antd";
import TeachingStaffCard from "../course/teaching-staff/TeachingStaffCard";
import InteractionsHelpedStats from "../analytics/sessions/InteractionsHelpedStats";
import Announcement from "../course/announcement/Announcement";
import TAContentTabs from "./TAContentTabs";
import TAEndSessionButton from "../modals/buttons/TAEndSessionButton";
import TASignOffButton from "../modals/buttons/TASignOffButton";
import MakeAnnouncementButton from "../modals/buttons/MakeAnnouncementButton";
import "./tahelp.css";
import PieChartCardSession from "../analytics/sessions/PieChartCardSession";
import { connect } from "react-redux";
import TAQueueStatus from "./TAQueueStatus";

import {
  closeSession,
  leaveSession,
  pinAnnouncement,
  closeAnnouncement,
  makeAnnouncement,
} from "../../redux/courses/actions/ta";
import selectors from "../../redux/selectors";

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 */
const ActiveTASession = (props) => {
  const { course, session, stats } = props;

  return (
    <div
      className={
        props.userIsInstructor ? "instructor-help-wrapper" : "ta-help-wrapper"
      }
    >
      <div>
        <Row align="center">
          <Col span={24}>
            <TAQueueStatus
              TAButtons={
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
        </Row>

        <Row>
          <Col span={24}>
            {session?.announcements?.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  announcement={item}
                  handleClose={async (announcement) => {
                    await props.closeAnnouncement(announcement?._id);
                  }}
                  handlePin={async (announcement) =>
                    await props.pinAnnouncement(announcement?._id)
                  }
                />
              );
            })}
          </Col>
        </Row>
        <Col span={24}>
          <TAContentTabs course={course} session={session} />
        </Col>
        {stats?.pieChart ? (
          <Row>
            <Col xs={24} md={14}>
              <PieChartCardSession data={stats?.pieChart} />
            </Col>
            <Col xs={24} md={10}>
              <InteractionsHelpedStats stats={stats} />
            </Col>
          </Row>
        ) : (
          <InteractionsHelpedStats horizontal stats={stats} />
        )}
        <Col span={24}>
          {session && <TeachingStaffCard staffers={session.staffers} />}
        </Col>
        {/* <Col span={24}>
          <div style={{ padding: 8 }}>
            {session?.staffers?.length > 1 ? (
              <TASignOffButton onSubmit={props.leaveSession} />
            ) : (
              <TAEndSessionButton onSubmit={props.closeSession} />
            )}
          </div>
        </Col> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
    stats: selectors.getStats(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
};

export default connect(mapStateToProps, {
  closeSession,
  leaveSession,
  pinAnnouncement,
  closeAnnouncement,
  makeAnnouncement,
})(ActiveTASession);
