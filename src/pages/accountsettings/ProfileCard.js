import React from "react";
import { Card, Avatar, Badge, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { DefaultProfile } from "../../static/Images";
const styles = {
  editIcon: {
    color: "#40A9FF",
    backgroundColor: "#91D5FF",
    marginTop: "30px",
    marginRight: "30px",
  },
};

const EditIcon = (
  <Link to="/accountsettings">
    <Avatar size="small" style={styles.editIcon}>
      <EditOutlined />
    </Avatar>
  </Link>
);
const ProfileCard = () => {
  return (
    <Card className="FullWidth">
      <Space size={16}>
        <Badge count={EditIcon}>
          <Avatar size={120} src={DefaultProfile} />
        </Badge>
        <Space direction="vertical">
          <h2>Jaidha Rosenblatt</h2>
          <p>jrr59@duke.edu</p>
        </Space>
      </Space>
    </Card>
  );
};

export default ProfileCard;
