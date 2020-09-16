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

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 */
const TAHelp = () => {
  const auth = useContext(AuthContext);
  const { state, dispatch } = useContext(TAHelpContext);

  const [helpingStudent, setHelpingStudent] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function getStats() {
      // Set questions for this session
      const res = await API.getQuestions(state.session._id);
      const statsRes = getTAStats(auth.state.user._id, res);
      setStats(statsRes);
    }
    getStats();
  }, [state.session?._id, auth.state.user._id]);

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
                functions.makeAnnouncement(state, dispatch, auth, message)
              }
            />

            {state.session.announcements?.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  announcement={item}
                  handleClose={(announcement) =>
                    functions.closeAnnouncement(
                      state,
                      dispatch,
                      auth,
                      announcement
                    )
                  }
                  handlePin={(announcement) =>
                    functions.pinAnnnouncement(
                      state,
                      dispatch,
                      auth,
                      announcement
                    )
                  }
                />
              );
            })}
          </Col>
        </Row>

        <Col span={24}>
          <TAContentTabs
            // handleEdit={props.handleEdit}
            helpingStudent={helpingStudent}
            setHelpingStudent={setHelpingStudent}
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
                onSubmit={() => functions.signOff(state, dispatch, auth)}
              />
            ) : (
              <TAEndSessionButton
                onSubmit={() => functions.closeSession(state, dispatch)}
              />
            )}
          </div>
        </Col>
      </div>
    </div>
  );
};

export default TAHelp;
