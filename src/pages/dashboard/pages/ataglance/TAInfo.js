import React from "react";
import { Card, List, Space, Avatar, Row, Tag } from "antd";
import { DefaultProfile } from "../../../../static/Images";
import "./TAInfo.css";

const TAProfile = {
  name: "Jaidha Rosenblatt",
  role: "Undergraduate Teaching Assistant",
  year: "2021",
  classes: [
    {
      name: "CS 101",
      position: "Teaching Assistant",
      description: "Introduction to programming",
    },
    {
      name: "CS 310",
      position: "Student",
      description: "Computer Architecture",
    },
    {
      name: "CS 330",
      position: "Student",
      description: "Design and Analysis of Algorithms",
    },
  ],
};

const TAInfo = () => {
  return (
    <Row align="center">
      <Card style={{ width: 700 }}>
        <Row>
          <Space size={16}>
            <Avatar size={80} src={DefaultProfile} />
            <Space direction="vertical">
              <h2>{TAProfile.name}</h2>
              <p>{TAProfile.role}</p>
              <p>{TAProfile.year}</p>
            </Space>
          </Space>
        </Row>
        <Row>
          <Card className="FullWidth" title={<h2>Courses</h2>}>
            <List
              itemLayout="horizontal"
              dataSource={TAProfile.classes}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<p>{item.name}</p>}
                    description={<h3>{item.description}</h3>}
                  />
                  <Tag className="InfoTag" color="blue">
                    {item.position}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Row>
      </Card>
    </Row>
  );
};

export default TAInfo;
