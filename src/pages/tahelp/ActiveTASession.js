import React from "react";
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
 */
class TAHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpingStudent: false,
    };
  }

  stopHelp = () => {
    this.setState({ helpingStudent: false });
  };

  startHelp = () => {
    this.setState({ helpingStudent: true });
  };

  render() {
    const course = this.props.course;
    const session = this.props.session;
    console.log(session);
    return (
      <div className="HelpWrapper">
        <div>
          <Row align="center">
            <Col span={24}>
              <TitleHeader
                title={`${course.code} Office Hours`}
                alt="Help"
                image={ProblemImage}
                details={
                  <LocationTimeTag
                    location={session.location}
                    time={`Now until ${session.endTime}`}
                  />
                }
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {this.state.helpingStudent ? (
                <div onClick={this.stopHelp}>
                  <TAInteraction details={questiondetails} />
                </div>
              ) : (
                <InteractionsHelpedStats />
              )}
            </Col>
            <Col span={24}>
              <MakeAnnouncement />
            </Col>
          </Row>

          <Row align="center">
            <Col span={24}>
              <div onClick={this.startHelp}>
                <TaTable status={this.state.helpingStudent} />
              </div>
            </Col>
            <Col span={24}>
              <Row>
                <Col xs={24} md={12}>
                  <Card title={<h2>Questions</h2>}>
                    <DataPieChart data={data} />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <TeachingStaffCard active />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TAHelp;
