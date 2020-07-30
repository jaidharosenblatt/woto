import React, { useState, useContext } from "react";
import { Row, Col, Card } from "antd";

import { AuthContext } from "../../contexts/AuthContext";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import DataPieChart from "../../components/stat/DataPieChart";

import { ProblemImage } from "../../static/Images";
import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";
import MakeAnnouncement from "../../components/announcement/MakeAnnouncement";
import TaTable from "../../components/Tables/tahelp/TaTable";
import TAEndSessionButton from "../../components/buttons/TAEndSessionButton";
import TASignOffButton from "../../components/buttons/TASignOffButton";
import { convertDateString } from "../../utilfunctions/timeAgo";

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
 */
const TAHelp = (props) => {
  const { state } = useContext(AuthContext);

  const [helpingStudent, setHelpingStudent] = useState(false);
  console.log(state.user);

  return (
    <div className="HelpWrapper">
      <div>
        <Row align="center">
          <Col span={24}>
            <TitleHeader
              title={`${props.course.code} Office Hours`}
              alt="Help"
              image={ProblemImage}
              details={
                props.session && (
                  <LocationTimeTag
                    location={props.session.location}
                    time={`${convertDateString(
                      props.session.startTime
                    )} - ${convertDateString(props.session.endTime)}`}
                  />
                )
              }
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {helpingStudent ? (
              <div onClick={() => setHelpingStudent(false)}>
                <TAInteraction
                  suggestedLength={
                    props.course.sessionAttributes &&
                    props.course.sessionAttributes.interactionlength
                  }
                  details={questiondetails}
                />
              </div>
            ) : (
              <InteractionsHelpedStats />
            )}
          </Col>
          <Col span={24}>
            <MakeAnnouncement onSubmit={(value) => console.log(value)} />
          </Col>
        </Row>

        <Row align="center">
          <Col span={24}>
            <div onClick={() => setHelpingStudent(true)}>
              <TaTable status={helpingStudent} />
            </div>
          </Col>
          <Col span={24}>
            <div style={{ padding: 8 }}>
              {props.session.staffers.length > 1 ? (
                <TASignOffButton onSubmit={props.handleSignOff} />
              ) : (
                <TAEndSessionButton onSubmit={props.handleClose} />
              )}
            </div>

            <Row>
              <Col xs={24} md={12}>
                <Card title={<h2>Questions</h2>}>
                  <DataPieChart data={data} />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                {props.session && (
                  <TeachingStaffCard staffers={props.session.staffers} />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TAHelp;
