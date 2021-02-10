import React, { useEffect } from "react";
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
import { loadHome } from "../../../redux/dashboard/actionCreators";
import selectors from "../../../redux/selectors";
import { connect } from "react-redux";

const AtAGlance = (props) => {
  const homeAlreadyLoaded =
    props.home && props.activeCourse === props.dashboardCourse;
  const _loadHome = props.loadHome;

  useEffect(() => {
    if (!homeAlreadyLoaded) {
      _loadHome();
    }
  }, [homeAlreadyLoaded, _loadHome]);

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
        <Row justify="center">
          <Col xs={24} xl={12}>
            <StatCards home={props.home} />
            <DoubleCircDisplay home={props.home} />
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

const mapStateToProps = (state) => ({
  dashboardCourse: selectors.getDashboardCourse(state),
  activeCourse: selectors.getCourseID(state),
  home: selectors.getDashboardHome(state),
});

export default connect(mapStateToProps, { loadHome })(AtAGlance);

const PIE_CONCEPT_DATA = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

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
