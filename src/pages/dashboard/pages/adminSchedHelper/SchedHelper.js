import React from "react";
import { Row, Col, DatePicker } from "antd";
import HomeHeader from "../../HomeHeader";
import DayWeekChartCard from "./DayWeekChartCard";
import ScheduleHelperTableSetup from "../../Tables/ScheduleHelperTableSetup";

//<RangePicker format="MMMM Do" />
/**
 * Allows admin to break down OH by day of week and time of day
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */

class SchedHelper extends React.Component {
 
    state = { dayChoice: "Monday", hourChoice: "6pm" };
  

  demoOnClick = (e) => {
    console.log(e.activeLabel);
    this.setState({ dayChoice: e.activeLabel });
  };

  onHourClick = (e) => {
    console.log(e.activeLabel);
    this.setState({ hourChoice: e.activeLabel });
  };
  dayLabel() {
    if (this.state.dayChoice === null) {
      return "No Day Selected";
    } else {
      return this.state.dayChoice;
    }
  }

  sessionLabel() {
    if (this.state.dayChoice === null) {
      return "No Day Selected";
    } else {
      return this.state.dayChoice;
    }
  }

  hourLabel() {
    if (this.state.hourChoice === null) {
      return "No Day Selected";
    } else {
      return this.state.hourChoice;
    }
  }

  render() {
    const { RangePicker } = DatePicker;
    return (
      <div className="scheduleHelper">
        <Col span={24}>
          <Row>
            <Col span={24}>
              <HomeHeader
                course={this.props.course.name}
                page={this.props.details.title}
                description={this.props.details.description}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <RangePicker format="MMMM Do" />
            </Col>
          </Row>
          <Row >
            <Col sm={24}>
              <h5>Day of the Week</h5>
            </Col>
          </Row>
          <Row justify="center">
            <Col flex="auto" lg={24} xl={12}>
              <DayWeekChartCard
                dataList={DAY_CHART_LIST}
                updateTime="30 minutes"
                dataKey="day"
                onClick={this.demoOnClick}
              />
            </Col>
            <Col flex="auto" lg={24} xl={12}>
              <ScheduleHelperTableSetup
                tableData={DAY_SESSION_DATA}
                title={this.dayLabel()}
              />
            </Col>
          </Row>
          <Row justify="center" align="bottom">
            <Col flex="auto" sm={24}>
              <h5>Time of Day</h5>
            </Col>
          </Row>
          <Row justify="center">
            <Col flex="auto" lg={24} xl={12}>
              <DayWeekChartCard
                dataList={HOUR_CHART_LIST}
                updateTime="30 minutes"
                dataKey="hour"
                onClick={this.onHourClick}
              />
            </Col>
            <Col flex="auto" lg={24} xl={12}>
              <ScheduleHelperTableSetup
                tableData={SESSION_STARTING_DATA}
                title={this.hourLabel()}
              />
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default SchedHelper;
//DATA VARIABLES BELOW

//TABLE DATA VARIABLES

const DAY_SESSION_DATA = [
  {
    key: "1",
    date: "6/19",
    students: "14",
    avgWaitTime: "4:12",
    teachingAssistants: ["Jaidha Rosenblatt", "Kaden Rosenblatt"],
  },
  {
    key: "2",
    date: "6/12",
    students: "22",
    avgWaitTime: "30:12",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
  {
    key: "3",
    date: "6/5",
    students: "10",
    avgWaitTime: "5:10",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
  {
    key: "4",
    date: "5/30",
    students: "30",
    avgWaitTime: "32:12",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
];

const SESSION_STARTING_DATA = [
  {
    key: "1",
    date: "6/19",
    students: "20",
    avgWaitTime: "19:12",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
  {
    key: "2",
    date: "6/18",
    students: "18",
    avgWaitTime: "30:12",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
  {
    key: "3",
    date: "6/17",
    students: "6",
    avgWaitTime: "5:10",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
  {
    key: "4",
    date: "6/16",
    students: "7",
    avgWaitTime: "2:12",
    teachingAssistants: ["Jaidha Rosenblatt"],
  },
];

//CHART DATA

const DAY_CHART_LIST = [
  { day: "Sunday", min: 10, avg: 15, max: 20 },
  { day: "Monday", min: 9, avg: 15, max: 30 },
  { day: "Tuesday", min: 10, avg: 35, max: 120 },
  { day: "Wednesdy", min: 7, avg: 30, max: 130 },
  { day: "Thursday", min: 3, avg: 50, max: 120 },
  { day: "Friday", min: 1, avg: 4, max: 10 },
  { day: "Saturday", min: 3, avg: 15, max: 30 },
];

const HOUR_CHART_LIST = [
  { hour: "3pm", min: 0, avg: 5, max: 15 },
  { hour: "4pm", min: 1, avg: 12, max: 40 },
  { hour: "5pm", min: 5, avg: 15, max: 60 },
  { hour: "6pm", min: 10, avg: 20, max: 100 },
  { hour: "7pm", min: 15, avg: 25, max: 120 },
  { hour: "8pm", min: 2, avg: 12, max: 30 },
  { hour: "9pm", min: 0, avg: 5, max: 30 },
];
