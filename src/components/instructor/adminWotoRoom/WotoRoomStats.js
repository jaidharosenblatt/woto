import React from "react";
import { Row, Col } from "antd";
import ChartWotoRoom from "../../../../components/charts/WotoRoom/ChartWotoRoom";
//Compont Imports
import HomeHeader from "../../HomeHeader";
import DateSelectWotoRoom from "./DateSelectWotoRoom";
import DiscussionGroupsTable from "../../../../components/Tables/admin-WotoRoom/DiscussionGroupsTable";
class WotoRoomStats extends React.Component {

  renderContent() {
    return (
      <div className="woto-room">
        <Row>
          <Col span={24}>
            <ChartWotoRoom dataList={TABLE_LIST} units="minutes" choice="min" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DiscussionGroupsTable tableData={DISCUSSION_GROUPS_DATA} />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
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
        <br></br>
        <Row>
          <Col span={24}>
            <DateSelectWotoRoom />
          </Col>
        </Row>
        <br></br>
        {this.renderContent()}
      </Col>
    );
  }
}

export default WotoRoomStats;

//FAKE DATA
const TABLE_LIST = [
  { session: "2", groups: 35, students: 40 },
  { session: "3", groups: 25, students: 35 },
  { session: "4", groups: 20, students: 30 },
  { session: "5", groups: 40, students: 50 },
  { session: "6", groups: 10, students: 10 },
  { session: "7", groups: 15, students: 20 },
  { session: "8", groups: 45, students: 70 },
  { session: "9", groups: 40, students: 50 },
  { session: "10", groups: 15, students: 30 },
  { session: "11", groups: 12, students: 20 },
  { session: "12", groups: 10, students: 10 },
  { session: "13", groups: 15, students: 20 },
  { session: "14", groups: 25, students: 30 },
  { session: "15", groups: 30, students: 40 },
  { session: "16", groups: 20, students: 50 },
  { session: "17", groups: 50, students: 60 },
  { session: "18", groups: 35, students: 70 },
  { session: "19", groups: 70, students: 80 },
  { session: "20", groups: 45, students: 90 },
  { session: "21", groups: 50, students: 60 },
  { session: "22", groups: 23, students: 50 },
  { session: "23", groups: 25, students: 40 },
  { session: "24", groups: 10, students: 30 },
  { session: "25", groups: 12, students: 20 },
  { session: "26", groups: 10, students: 10 },
  { session: "27", groups: 9, students: 20 },
  { session: "28", groups: 3, students: 30 },
  { session: "29", groups: 8, students: 40 },
  { session: "30", groups: 20, students: 50 },
  { session: "31", groups: 30, students: 60 },
];
//TABLE DATA
/*
const DISCUSSION_GROUPS_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    assignment: "HW 1 Problem 3",
    stage: "Debugging Solution",
    groupNumber: "1",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    assignment: "HW 1 Problem 4",
    stage: "Debugging Solution",
    groupNumber: "1",
  },

  {
    key: "6",
    firstname: "Harry",
    lastname: "Potter",
    assignment: "HW 1 Problem 3",
    stage: "Debugging Solution",
    groupNumber: "2",
  },
  {
    key: "7",
    firstname: "Hermione",
    lastname: "Granger",
    assignment: "HW 1 Problem 4",
    stage: "Debugging Solution",
    groupNumber: "2",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    assignment: "HW 1 Problem 3",
    stage: "Understand Question",
    groupNumber: "2",
  },

  {
    key: "100",
    firstname: "Noah",
    lastname: "Karpel",
    assignment: "HW 1 Problem 3",
    stage: "Debugging Solution",
    groupNumber: "3",
  },
  {
    key: "102",
    firstname: "Tommy",
    lastname: "Tilton",
    assignment: "HW 1 Problem 4",
    stage: "Debugging Solution",
    groupNumber: "3",
  },
  {
    key: "104",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    assignment: "HW 1 Problem 3",
    stage: "Just Started",
    groupNumber: "3",
  },
];
*/

const DISCUSSION_GROUPS_DATA = [
    {
        key: 0,
        groupNumber: "1",
        firstname: "",
        lastname: "",
        assignment: "",
        stage: "",
        children: [
            {
                key: "1",
                firstname: "Noah",
                lastname: "Karpel",
                assignment: "HW 1 Problem 3",
                stage: "Debugging Solution",
                groupNumber: "1"
              },
              {
                key: "2",
                firstname: "Tommy",
                lastname: "Tilton",
                assignment: "HW 1 Problem 4",
                stage: "Debugging Solution",
                groupNumber: "1"
              },
        ],
    },
    {
        key: 5,
        groupNumber: "2",
        firstname: "",
        lastname: "",
        assignment: "",
        stage: "",
        children: [
            {
                key: "6",
                firstname: "Harry",
                lastname: "Potter",
                assignment: "HW 1 Problem 3",
                stage: "Debugging Solution",
                groupNumber: "2"
              },
              {
                key: "7",
                firstname: "Hermione",
                lastname: "Granger",
                assignment: "HW 1 Problem 4",
                stage: "Debugging Solution",
                groupNumber: "2"
              },
              {
                key: "3",
                firstname: "Matthew",
                lastname: "Sclar",
                assignment: "HW 1 Problem 3",
                stage: "Understand Question",
                groupNumber: "2"
              },
        ],
    },
    {
        key: 10,
        groupNumber: "3",
        firstname: "",
        lastname: "",
        assignment: "",
        stage: "",
        children: [
            {
                key: "1",
                firstname: "Noah",
                lastname: "Karpel",
                assignment: "HW 1 Problem 3",
                stage: "Debugging Solution",
                groupNumber: "3"
              },
              {
                key: "2",
                firstname: "Tommy",
                lastname: "Tilton",
                assignment: "HW 1 Problem 4",
                stage: "Debugging Solution",
                groupNumber: "3"
              },
              {
                key: "4",
                firstname: "Kaden",
                lastname: "Rosenblatt",
                assignment: "HW 1 Problem 3",
                stage: "Just Started",
                groupNumber: "3"
              },
        ],
    },

 
  ];
  
