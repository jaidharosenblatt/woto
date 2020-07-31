import React, { useState, useContext } from "react";
import { Row, Col, Card } from "antd";

import { AuthContext } from "../../contexts/AuthContext";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import DataPieChart from "../../components/stat/DataPieChart";

import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";
import MakeAnnouncement from "../../components/announcement/MakeAnnouncement";
import Announcement from "../../components/announcement/Announcement";

import TaTable from "../../components/Tables/tahelp/TaTable";
import TAEndSessionButton from "../../components/buttons/TAEndSessionButton";
import TASignOffButton from "../../components/buttons/TASignOffButton";
import ActiveHeader from "../../components/header/ActiveHeader";

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
 * @param {props} handleClose callback to close the session
 * @param {props} handleAnnouncement callback to make an announcement
 */
const TAHelp = (props) => {
  const { state } = useContext(AuthContext);
  const [helpingStudent, setHelpingStudent] = useState(false);
  console.log(state.user);

  return (
    <div className="HelpWrapper">
      <div>
        <Row align="center">
          <ActiveHeader
            courseCode={props.course && props.course.code}
            session={props.session}
          />
        </Row>

        <Row>
          <Col span={24}>
            <MakeAnnouncement onSubmit={props.handleAnnouncement} />
            {props.session.accouncements &&
              props.session.accouncements.map((item, key) => {
                return <Announcement key={key} message={item.announcement} />;
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
          <div onClick={() => setHelpingStudent(true)}>
            <TaTable status={helpingStudent} />
          </div>
        </Col>
        <Row>
          <Col xs={24} md={14}>
            <Card title={<h2>Questions</h2>}>
              <DataPieChart data={data} />
            </Card>
          </Col>
          <Col xs={24} md={10}>
            <InteractionsHelpedStats />
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
