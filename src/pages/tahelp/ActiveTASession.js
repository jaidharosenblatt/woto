import React, { useContext } from "react";
import { Row, Col } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import MakeAnnouncement from "../../components/announcement/MakeAnnouncement";
import Announcement from "../../components/announcement/Announcement";
import TAContentTabs from "./TAContentTabs";
import TAEndSessionButton from "../../components/buttons/TAEndSessionButton";
import TASignOffButton from "../../components/buttons/TASignOffButton";
import ActiveHeader from "../../components/header/ActiveHeader";
import "./tahelp.css";
import PieChartCardSession from "../../components/stat/PieChartCardSession";
import { connect } from "react-redux";

import actions from "../../redux/courses/actionCreators";
import selectors from "../../redux/courses/selectors";

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 */
const ActiveTASession = (props) => {
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const courseID = props.course?._id;

  const { course, session, stats } = props;

  return (
    <div
      className={
        auth.state.userType === "instructor"
          ? "instructor-help-wrapper"
          : "ta-help-wrapper"
      }
    >
      <div>
        <Row align="center">
          <ActiveHeader courseCode={course?.code} session={session} />
        </Row>

        <Row>
          <Col span={24}>
            <MakeAnnouncement
              onSubmit={(message) =>
                props.makeAnnouncement(
                  courseID,
                  userID,
                  auth.state.user.name,
                  message
                )
              }
            />

            {session.announcements?.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  announcement={item}
                  handleClose={(announcement) =>
                    props.closeAnnouncement(courseID, userID, announcement?._id)
                  }
                  handlePin={(announcement) =>
                    props.pinAnnouncement(courseID, userID, announcement?._id)
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
            {session?.staffers.length > 1 ? (
              <TASignOffButton
                onSubmit={() => props.leaveSession(courseID, userID)}
              />
            ) : (
              <TAEndSessionButton
                onSubmit={() => props.closeSession(courseID, userID)}
              />
            )}
          </div>
        </Col>
      </div>
    </div>
  );
};

const {
  closeSession,
  leaveSession,
  pinAnnouncement,
  closeAnnouncement,
  makeAnnouncement,
} = actions;

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
    stats: selectors.getStats(state),
  };
};

export default connect(mapStateToProps, {
  closeSession,
  leaveSession,
  pinAnnouncement,
  closeAnnouncement,
  makeAnnouncement,
})(ActiveTASession);
