import React from "react";
import { Card, Badge, Avatar, List } from "antd";
import { DefaultProfile } from "../../static/Images";
import "./TeachingStaff.css";

const staff = [
  {
    name: "Kaden Rosenblatt",
    avatar: DefaultProfile,
    userType: "Graduate Teaching Assistant",
    isActive: true,
  },
  {
    name: "Jaidha Rosenblatt",
    avatar: DefaultProfile,
    userType: "Undergraduate Teaching Assistant",
    isActive: true,
  },
];

const inactiveStaff = [
  {
    name: "Kaden Rosenblatt",
    avatar: DefaultProfile,
    userType: "Graduate Teaching Assistant",
    isActive: false,
  },
  {
    name: "Jaidha Rosenblatt",
    avatar: DefaultProfile,
    userType: "Undergraduate Teaching Assistant",
    isActive: false,
  },
  {
    name: "Mary Gooneratne",
    avatar: DefaultProfile,
    userType: "Undergraduate Teaching Assistant",
    isActive: false,
  },
  {
    name: "Tommy Tilton",
    avatar: DefaultProfile,
    userType: "Undergraduate Teaching Assistant",
    isActive: false,
  },
  {
    name: "Matthew Sclar",
    avatar: DefaultProfile,
    userType: "Undergraduate Teaching Assistant",
    isActive: false,
  },
];

const renderAvatar = (image, isActive) => {
  if (isActive) {
    return (
      <Badge status="success">
        <Avatar src={image} />
      </Badge>
    );
  }
  return <Avatar src={image} />;
};

/**
 * @jaidharosenblatt renders a json object that has active staff for a session
 */
const TeachingStaffCard = ({ active }) => {
  return (
    <Card title={<h2>Teaching Staff</h2>} className="Staff">
      <List
        itemLayout="horizontal"
        dataSource={active ? staff : inactiveStaff}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={renderAvatar(item.avatar, item.isActive)}
              title={<p>{item.name}</p>}
              description={<h3>{item.userType}</h3>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TeachingStaffCard;
