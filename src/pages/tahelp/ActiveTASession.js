import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Card } from "antd";

import { AuthContext } from "../../contexts/AuthContext";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import DataPieChart from "../../components/stat/DataPieChart";

import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";
import MakeAnnouncement from "../../components/announcement/MakeAnnouncement";
import Announcement from "../../components/announcement/Announcement";

import TAContentTabs from "./TAContentTabs";
import TAEndSessionButton from "../../components/buttons/TAEndSessionButton";
import TASignOffButton from "../../components/buttons/TASignOffButton";
import ActiveHeader from "../../components/header/ActiveHeader";
import { getTAStats } from "./stats";

import "./tahelp.css";
import API from "../../api/API";
const data = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

const questiondetails = {
  assignment: "Assignment 3",
  problem: "Problem 1",
  stage: "Just getting started",
  question: "Don't know what a linked list is",
};

/**
 * @jaidharosenblatt @matthewsclar Page for students to recieve help for a given course
 * @param {props} session active session
 * @param {props} course current course
 * @param {props} handleEdit callback to edit session
 * @param {props} handleClose callback to close the session
 * @param {props} handleSignOff callback to sign out of session
 */
const TAHelp = (props) => {
  const { state } = useContext(AuthContext);
  const [helpingStudent, setHelpingStudent] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function getStats() {
      // Set questions for this session
      const res = await API.getQuestions(props.session._id);
      const statsRes = getTAStats(state.user._id, res);
      setStats(statsRes);
      console.log(statsRes);
    }
    getStats();
  }, []);

  const handleCloseAnnouncement = (announcement) => {
    const temp = props.session.announcements.filter(
      (item) => item._id !== announcement._id
    );

    props.handleEdit({
      announcements: temp,
    });
  };

  const handleAnnouncement = (message) => {
    const change = {
      announcements: [
        {
          announcement: message,
          ownerId: state.user._id,
          ownerName: state.user.name,
        },
        ...props.session.announcements,
      ],
    };
    props.handleEdit(change);
  };
  return (
    <div
      className={
        state.userType === "instructor"
          ? "instructor-help-wrapper"
          : "ta-help-wrapper"
      }
    >
      <div>
        <Row align="center">
          <ActiveHeader
            courseCode={props.course && props.course.code}
            session={props.session}
          />
        </Row>

        <Row>
          <Col span={24}>
            <MakeAnnouncement onSubmit={handleAnnouncement} />
            {props.session.announcements?.map((item, key) => {
              return (
                //const bool = item.ownerId !== this.state.user._id waiting for DB change to enable ownerId
                <Announcement
                  key={key}
                  announcement={item}
                  handleClose={handleCloseAnnouncement}
                />
              );
            })}
            {helpingStudent && (
              <div onClick={() => setHelpingStudent(false)}>
                <TAInteraction
                  suggestedLength={
                    props.course.sessionAttributes &&
                    props.course.sessionAttributes.interactionlength
                  }
                  details={questiondetails}
                />
              </div>
            )}
          </Col>
        </Row>

        <Col span={24}>
          <TAContentTabs
            handleEdit={props.handleEdit}
            helpingStudent={helpingStudent}
            setHelpingStudent={setHelpingStudent}
            course={props.course}
            session={props.session}
          />
        </Col>
        <Row>
          <Col xs={24} md={14}>
            <Card title={<h2>Questions</h2>}>
              <DataPieChart data={data} />
            </Card>
          </Col>
          <Col xs={24} md={10}>
            <InteractionsHelpedStats stats={stats} />
          </Col>
        </Row>
        <Col span={24}>
          {props.session && (
            <TeachingStaffCard staffers={props.session.staffers} />
          )}
        </Col>
        <Col span={24}>
          <div style={{ padding: 8 }}>
            {props.session.staffers.length > 1 ? (
              <TASignOffButton onSubmit={props.handleSignOff} />
            ) : (
              <TAEndSessionButton onSubmit={props.handleClose} />
            )}
          </div>
        </Col>
      </div>
    </div>
  );
};

export default TAHelp;
