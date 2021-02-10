import React, { useEffect } from "react";
import { Row, Col, Space, Card } from "antd";
import HomeHeader from "../HomeHeader";
import TASelect from "../../form/TASelect";
import "../dashboard.css";
import StatCards from "./StatCards";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
import DoubleCircDisplay from "../../analytics/dashboard/DoubleCircDisplay";
import PastSessionsTable from "../../analytics/tables/PastSessionsTable";
import DateSelect from "./DateSelect";
import { loadHome } from "../../../redux/dashboard/actionCreators";
import selectors from "../../../redux/selectors";
import { connect } from "react-redux";
import TopicsPieChart from "./TopicsPieChart";

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
            <Card style={{ height: "calc(100% - 16px)" }}>
              <TopicsPieChart
                questionsDistribution={props.home?.questionsDistribution}
              />
            </Card>
          </Col>
        </Row>
        <PastSessionsTable sessions={props.home?.sessions} />
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
