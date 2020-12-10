import React from "react";
import { Card, Badge, Avatar, List, Button } from "antd";
import { DefaultProfile } from "../../../static/Images";
import "./TeachStaffSpecificSession.css";

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
 * @tommytilton renders a json object that has active staff for a session
 */
const TeachingStaffSpecificSession = ({ active, onDetailsClick }) => {
  //Handler for Details Click button
  onDetailsClick = (e) => {
    // e.currentTarget.value prints out name right now. Look below to see
    //that I assign value to item.name.
    console.log(e.currentTarget.value);
  };
  const styles = {
    card: {
      width: "100%",
      backgroundColor: "#ffffff",
      padding: "0px",
      height: "100%",
      lineHeight: 1,
      //margin: "0px",
    },
  };

  return (
    <Card
      title={<h2>Teaching Staff</h2>}
      style={styles.card}
      className="StaffSpecific"
    >
      <List
        style={{ height: "300px" }}
        itemLayout="horizontal"
        dataSource={active ? staff : inactiveStaff}
        pagination={{ pageSize: 4 }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                value={item.name}
                type="Primary"
                onClick={(e) => onDetailsClick(e)}
              >
                Details
              </Button>,
            ]}
          >
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

export default TeachingStaffSpecificSession;

/*
          <List.Item>
            <List.Item.Meta
              avatar={renderAvatar(item.avatar, item.isActive)}
              title={<p>{item.name}</p>}
              description={<h3>{item.userType}</h3>}
            />
          
       
          </List.Item>
  <div>
            <Button
              key={item.name}
              value={item.name}
              type="primary"
              onClick={(e) => onDetailsClick(e)}
            >
              Details
            </Button>
            </div>
*/
