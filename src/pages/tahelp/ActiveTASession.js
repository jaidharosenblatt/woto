import React, { useState, useContext, useEffect } from "react";
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
import { getTAStats } from "./util/stats";

import "./tahelp.css";
import API from "../../api/API";
import PieChartCardSession from "../../components/stat/PieChartCardSession";
import functions from "./util/functions";
import { TAHelpContext } from "./util/TAHelpContext";

import { CourseContext } from "./util/CourseContext";
import { connect } from "react-redux";
import {
  select,
  makeAnnouncement,
  closeAnnouncement,
  pinAnnouncement,
  leaveSession,
  closeSession,
} from "../../ducks/courses";

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 */
const ActiveTASession = ({
  courses,
  makeAnnouncement,
  closeAnnouncement,
  pinAnnouncement,
  leaveSession,
  closeSession,
}) => {
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const courseID = useContext(CourseContext);

  const [stats, setStats] = useState([]);

  const state = select(courses, courseID);

  useEffect(() => {
    async function getStats() {
      // Set questions for this session
      const statsRes = getTAStats(userID, state.session?.questions);
      setStats(statsRes);
    }
    getStats();
  }, [state.session?.questions, userID]);

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
          <ActiveHeader
            courseCode={state.course?.code}
            session={state.session}
          />
        </Row>

        <Row>
          <Col span={24}>
            <MakeAnnouncement
              onSubmit={(message) =>
                makeAnnouncement(
                  courseID,
                  userID,
                  auth.state.user.name,
                  message
                )
              }
            />

            {state.session.announcements?.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  announcement={item}
                  handleClose={(announcement) =>
                    closeAnnouncement(courseID, userID, announcement?._id)
                  }
                  handlePin={(announcement) =>
                    pinAnnouncement(courseID, userID, announcement?._id)
                  }
                />
              );
            })}
          </Col>
        </Row>

        <Col span={24}>
          <TAContentTabs
            course={state.course}
            session={state.session}
            successMessage={state.message?.success}
          />
        </Col>

        {stats.pieChart ? (
          <Row>
            <Col xs={24} md={14}>
              <PieChartCardSession data={stats.pieChart} />
            </Col>
            <Col xs={24} md={10}>
              <InteractionsHelpedStats stats={stats} />
            </Col>
          </Row>
        ) : (
          <InteractionsHelpedStats horizontal stats={stats} />
        )}

        <Col span={24}>
          {state.session && (
            <TeachingStaffCard staffers={state.session.staffers} />
          )}
        </Col>
        <Col span={24}>
          <div style={{ padding: 8 }}>
            {state.session?.staffers.length > 1 ? (
              <TASignOffButton
                onSubmit={() => leaveSession(courseID, userID)}
              />
            ) : (
              <TAEndSessionButton
                onSubmit={() => closeSession(courseID, userID)}
              />
            )}
          </div>
        </Col>
      </div>
    </div>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    ...prevProps,
  };
};

export default connect(mapStateToProps, {
  makeAnnouncement,
  closeAnnouncement,
  pinAnnouncement,
  leaveSession,
  closeSession,
})(ActiveTASession);
