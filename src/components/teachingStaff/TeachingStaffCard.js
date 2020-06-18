import React from "react";
import { Card, Badge, Avatar, List } from "antd";
import { DefaultProfile } from "../../static/Images";
import "./TeachingStaff.css";

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
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const TeachingStaffCard = () => {
  return (
    <Card title={<h2>Teaching Staff</h2>} className="Staff">
      <List
        itemLayout="horizontal"
        dataSource={staff}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={renderAvatar(item.avatar, item.isActive)}
              title={<p>{item.name}</p>}
              description={<h3>{item.role}</h3>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TeachingStaffCard;
