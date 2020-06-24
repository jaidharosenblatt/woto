import React from "react";
import { Row, Col, Card } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import DataPieChart from "../../components/stat/DataPieChart";

import { ProblemImage } from "../../static/Images";
import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";
import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";

const data = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
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
    return (
      <div className="HelpWrapper">
        <div>
          <Row align="center">
            <Col span={24}>
              <TitleHeader
                title={`${course.name} Office Hours`}
                alt="Help"
                image={ProblemImage}
                details={
                  <LocationTimeTag location="Virtual" time="Now until 4pm" />
                }
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {this.state.helpingStudent ? (
                <div onClick={this.stopHelp}>
                  <TAInteraction />
                </div>
              ) : (
                <InteractionsHelpedStats />
              )}
            </Col>
          </Row>

          <Row align="center">
            <Col span={24}>
              <div onClick={this.startHelp}>
                <MainColabComp />
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
