import React from "react";
import { Row, Col, Card } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import InteractionsHelpedStats from "../../components/stat/InteractionsHelpedStats";
import DataPieChart from "../../components/stat/DataPieChart";

import { HelpImage } from "../../static/Images";
import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";

const data = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const TAHelp = ({ course }) => {
  return (
    <div className="HelpWrapper">
      <div>
        <Row align="center">
          <Col span={24}>
            <TitleHeader
              title={`${course.name} Office Hours`}
              alt="Help"
              image={HelpImage}
              details={
                <LocationTimeTag location="Virtual" time="Now until 4pm" />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TAInteraction />
          </Col>
        </Row>
        <Row align="center">
          <Col xs={24} md={14}>
            {course.active ? <div>hi</div> : null}
          </Col>
          <Col xs={24} md={10}>
            {course.active ? <InteractionsHelpedStats /> : null}
            <Row>
              <Col span={24}>
                <Card title={<h2>Questions</h2>}>
                  <DataPieChart data={data} />
                </Card>
                <TeachingStaffCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TAHelp;
