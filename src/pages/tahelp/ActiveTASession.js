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
import { CourseContext } from "./util/CourseContext";
import { connect } from "react-redux";

import redux from "../../redux/courses";

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 */
const ActiveTASession = (props) => {
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const courseID = useContext(CourseContext);

  const state = redux.select(props.courses, courseID);

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
                props.makeAnnouncement(
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
          <TAContentTabs
            course={state.course}
            session={state.session}
            successMessage={state.message?.success}
          />
        </Col>

        {state.stats?.pieChart ? (
          <Row>
            <Col xs={24} md={14}>
              <PieChartCardSession data={state.stats?.pieChart} />
            </Col>
            <Col xs={24} md={10}>
              <InteractionsHelpedStats stats={state.stats} />
            </Col>
          </Row>
        ) : (
          <InteractionsHelpedStats horizontal stats={state.stats} />
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

export default connect(redux.mapStateToProps, redux)(ActiveTASession);
