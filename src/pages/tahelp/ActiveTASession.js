import React, { useState } from "react";
import { Row, Col, Card } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import DataPieChart from "../../components/stat/DataPieChart";

import { ProblemImage } from "../../static/Images";
import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";
import MakeAnnouncement from "../../components/announcement/MakeAnnouncement";
import TaTable from "../../components/Tables/tahelp/TaTable";
import EndSessionTA from "../../components/buttons/EndSessionTA";

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
  const [helpingStudent, setHelpingStudent] = useState(false);

  console.log(props);
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
                <LocationTimeTag
                  location={props.session.location}
                  time={`Now until ${props.session.endTime}`}
                />
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
              <EndSessionTA onSubmit={props.handleClose} />
            </div>

            <Row>
              <Col xs={24} md={12}>
                <Card title={<h2>Questions</h2>}>
                  <DataPieChart data={data} />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <TeachingStaffCard staffers={props.session.staffers} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TAHelp;
