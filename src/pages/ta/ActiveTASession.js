import React from "react";
import { Row, Col } from "antd";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/charts/sessions/InteractionsHelpedStats";
import MakeAnnouncement from "../../components/announcement/MakeAnnouncement";
import Announcement from "../../components/announcement/Announcement";
import TAContentTabs from "./TAContentTabs";
import TAEndSessionButton from "../../components/buttons/TAEndSessionButton";
import TASignOffButton from "../../components/buttons/TASignOffButton";
import ActiveHeader from "../../components/header/ActiveHeader";
import "./tahelp.css";
import PieChartCardSession from "../../components/charts/sessions/PieChartCardSession";
import { connect } from "react-redux";

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
          <ActiveHeader courseCode={course?.code} session={session} />
        </Row>

        <Row>
          <Col span={24}>
            <MakeAnnouncement
              onSubmit={async (message) =>
                await props.makeAnnouncement(message)
              }
            />

            {session?.announcements?.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  announcement={item}
                  handleClose={async (announcement) =>
                    await props.closeAnnouncement(announcement?._id)
                  }
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
        <Col span={24}>
          <div style={{ padding: 8 }}>
            {session?.staffers?.length > 1 ? (
              <TASignOffButton onSubmit={props.leaveSession} />
            ) : (
              <TAEndSessionButton onSubmit={props.closeSession} />
            )}
          </div>
        </Col>
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
