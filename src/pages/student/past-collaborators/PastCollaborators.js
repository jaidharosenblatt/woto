import React from "react";
import { Card, Badge, Avatar, List, Button } from "antd";
import { DefaultProfile } from "../../static/Images";
import "./past-collab.css";

const collaborators = [
  {
    name: "Kaden Rosenblatt",
    avatar: DefaultProfile,
    isActive: true,
  },
  {
    name: "Jaidha Rosenblatt",
    avatar: DefaultProfile,
    isActive: false,
  },
  {
    name: "Matthew Sclar",
    avatar: DefaultProfile,
    isActive: true,
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
 * @yasserelmzoudi renders a json object that a user's past collaborators
 */
const PastCollaborators = () => {
  return (
    <Card className="past-collab">
      <h2>Past Collaborators</h2>
      <div className="staff-scroll">
        <List
          itemLayout="horizontal"
          dataSource={collaborators}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={renderAvatar(item.avatar, item.isActive)}
                title={<p>{item.name}</p>}
              />
              <div>
                <Button type="primary" block="true">
                  Invite to Session
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default PastCollaborators;
