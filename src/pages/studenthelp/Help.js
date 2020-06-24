import React from "react";
import { Row, Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import FormCard from "./Form/FormCard";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import { HelpImage, WaitingImage } from "../../static/Images";
import InactiveSessionCard from "./InactiveSessionCard";
import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import YourQuestionCard from "../../components/collapsedquestion/YourQuestionCard";
import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";
import PastCollaboratorsCard from "../../components/collaborators/PastCollaborators.js";
/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: this.props.course.active ? "preSubmit" : "inactive",
      question: {
        assignment: "Assignment 3",
        problem: "Problem 1",
        stage: "Just getting started",
        question: "Don't know what a linked list is",
      },
    };
  }

  onFormSubmit = (res) => {
    // this.setState({ question: res, pageState: "waiting" });
    this.setState({ pageState: "waiting" });
  };

  onHelped = () => {
    this.setState({ pageState: "helped" });
  };

  render() {
    const course = this.props.course;
    const preSubmit = (
      <Row align="center">
        <Col xs={24} md={14}>
          <FormCard onFormSubmit={this.onFormSubmit} />
        </Col>
        <Col xs={24} md={10}>
          <WaitQueueStatCards />
          <Row>
            <Col span={24}>
              <TeachingStaffCard active />
            </Col>
          </Row>
        </Col>
      </Row>
    );

    const inactive = (
      <Row align="center">
        <Col span={24}>
          <div>
            <InactiveSessionCard /> <TeachingStaffCard />
          </div>
        </Col>
      </Row>
    );

    const waiting = (
      <Row align="center">
        <Col span={24}>
          <WaitQueueStatCards />
          <div onClick={this.onHelped}>
            <MainColabComp />
          </div>
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={24} md={12}>
              <YourQuestionCard details={this.state.question} />
            </Col>
            <Col xs={24} md={12}>
              <TeachingStaffCard active />
            </Col>
          </Row>
        </Col>
      </Row>
    );

    const helped = (
      <Row align="center">
        <Col xs={24} md={16}>
          <HelpReady />
        </Col>
        <Col xs={24} md={8}>
          <YourQuestionCard details={this.state.question} />
        </Col>
        <Col span={24}>
          <PastCollaboratorsCard />
        </Col>
      </Row>
    );

    var page = null;
    switch (this.state.pageState) {
      case "inactive":
        page = inactive;
        break;
      case "waiting":
        page = waiting;
        break;
      case "helped":
        page = helped;
        break;
      default:
        page = preSubmit;
        break;
    }
    return (
      <div className="HelpWrapper">
        <div>
          <Row align="center">
            <Col span={24}>
              <TitleHeader
                title={`${course.name} Office Hours`}
                alt="Help"
                image={course.active ? HelpImage : WaitingImage}
                details={
                  course.active ? (
                    <LocationTimeTag location="Virtual" time="Now until 4pm" />
                  ) : (
                    <LocationTimeTag time="No active sessions" />
                  )
                }
              />
            </Col>
          </Row>
          {page}
        </div>
      </div>
    );
  }
}

export default Help;
