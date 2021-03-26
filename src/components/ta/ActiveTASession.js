import React from "react";
import { Row, Col, Alert } from "antd";
import TeachingStaffCard from "../course/teaching-staff/TeachingStaffCard";
import InteractionsHelpedStats from "../analytics/sessions/InteractionsHelpedStats";
import Announcement from "../course/announcement/Announcement";
import "./tahelp.css";
import PieChartCardSession from "../analytics/sessions/PieChartCardSession";
import { connect } from "react-redux";
import TAQueueStatus from "./TAQueueStatus";
import {
  pinAnnouncement,
  closeAnnouncement,
  makeAnnouncement,
} from "../../redux/courses/actions/ta";
import selectors from "../../redux/selectors";
import HelpStudents from "./HelpStudents";

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 */
const ActiveTASession = (props) => {
  const { session, stats } = props;

  return (
    <div>
      <Row align="center">
        <Col span={24}>
          <TAQueueStatus />
        </Col>
      </Row>
      <Alert
        alert
        type="warning"
        message={
          "Please enable push notifications and keep this tab open to ensure that you do not miss an alert for when the first student joins the queue"
        }
      />

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
        <HelpStudents />
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
  pinAnnouncement,
  closeAnnouncement,
  makeAnnouncement,
})(ActiveTASession);
