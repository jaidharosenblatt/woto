import React from "react";
import { Card, Badge, Avatar, List } from "antd";
import { DefaultProfile } from "../../static/Images";
import "./TeachingStaff.css";

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
const TeachingStaffCard = ({ staffers }) => {
  return (
    <Card title={<h2>Teaching Staff</h2>} className="Staff">
      <List
        itemLayout="horizontal"
        dataSource={staffers}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={renderAvatar(
                item.avatar || DefaultProfile,
                item.isActive
              )}
              title={<p>{item.name || `Assistant ${index + 1}`}</p>}
              description={<h3>{item.userType}</h3>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TeachingStaffCard;
