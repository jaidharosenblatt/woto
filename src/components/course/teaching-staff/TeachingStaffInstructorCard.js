import React from "react";
import { Card, Space, Avatar, Tag, Button, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import "./TeachingStaff.css";

/**
 *  @Matthew component used to display teaching staff on the instructor dashboard
 *  for a specific session.
 *
 *  @param array of staff objects
 */

const TeachingStaffInstructorCard = () => {
  const staff = [
    {
      name: "Kaden Rosenblatt",
      avatar: DefaultProfile,
      role: "Graduate Teaching Assistant",
      isActive: true,
    },
    {
      name: "Jaidha Rosenblatt",
      avatar: DefaultProfile,
      role: "Undergraduate Teaching Assistant",
      isActive: true,
    },
  ];

  for (var i = 0; i < staff.length; i++) {
    if (staff[i].role === "Graduate Teaching Assistant") {
      staff[i].role = "Grad TA";
    }
    if (staff[i].role === "Undergraduate Teaching Assistant") {
      staff[i].role = "UTA";
    }
  }

  const renderedstaff = [];

  staff.forEach((member, i) =>
    renderedstaff.push(
      <Card size="small">
        <Row align="middle">
          <Col xs={3} md={2}>
            <Avatar src={member.avatar} />
          </Col>
          <Col xs={5} md={7}>
            <h3> {member.name} </h3>
          </Col>
          <Col xs={11} md={11} align="center">
            <Tag value={member.role}> {member.role} </Tag>
          </Col>
          <Col xs={3} md={4} align="center">
            <Button size="small" type="primary" value="Details">
              {" "}
              Details{" "}
            </Button>
          </Col>
        </Row>
      </Card>
    )
  );

  return (
    <Card className="TeachingStaffInstructorCard">
      <Space>
        <UserOutlined style={{ color: "#262626" }} />
        <h2 style={{ color: "#262626" }}> Teaching Staff </h2>
      </Space>

      {renderedstaff}
    </Card>
  );
};

export default TeachingStaffInstructorCard;
