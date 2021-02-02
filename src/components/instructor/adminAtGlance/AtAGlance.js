import React from "react";
import { Row, Col, Space, Card } from "antd";
import HomeHeader from "../HomeHeader";
import TASelect from "../../form/TASelect";
import "../dashboard.css";
import StatCards from "./StatCards";
import DataPieChart from "../../analytics/sessions/DataPieChart";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
import DoubleCircDisplay from "../../analytics/dashboard/DoubleCircDisplay";
import PastSessionsTable from "../../analytics/tables/PastSessionsTable";
import DateSelect from "./DateSelect";

const AtAGlance = (props) => {
  return (
    <VerticalSpace>
      {/* Match card margins */}
      <Space direction="vertical" style={{ margin: 8 }}>
        <HomeHeader
          course={props.course.name}
          page={props.details.title}
          description={props.details.description}
        />
        <Space>
          <DateSelect />
          <TASelect />
        </Space>
      </Space>

      <Col span={24}>
        <h2
          style={{ margin: "0 8px" }}
        >{`Overall Performance between ${StartDate} - ${EndDate}`}</h2>

        <Row justify="center">
          <Col xs={24} xl={12}>
            <StatCards />
            <DoubleCircDisplay
              Circle1Data={WaitTimeData}
              Circle2Data={InteractionData}
            />
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ height: "calc(100% - 8px)" }}>
              <h2>Questions</h2>
              <DataPieChart data={PIE_CONCEPT_DATA} />
            </Card>
          </Col>
        </Row>
        <PastSessionsTable />
      </Col>
    </VerticalSpace>
  );
};

export default AtAGlance;

const PIE_CONCEPT_DATA = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

///DATA VARIABLES/////
const StartDate = "May 10th";
const EndDate = "June 9th";

//TA DATA DISPLAY
const InteractionData = {
  title: "Interaction Length",
  color: "#1890FF",
  units: "minutes",
  min: 5,
  max: 150,
  avg: 30,
};

const WaitTimeData = {
  title: "Wait Time",
  color: "#eb5757",
  units: "minutes",
  min: 10,
  max: 300,
  avg: 67,
};
