import React from "react";
import { Card, Space } from "antd";

import { DefaultProfile } from "../../static/Images";

const styles = { avatar: { width: "50%", borderRadius: "100px" } };

const ProfileCard = () => {
  return (
    <Card>
      <Space direction="vertical" align="center">
        <img src={DefaultProfile} alt="avatar" style={styles.avatar} />
        <h2 style={styles.h2}>Jaidha Rosenblatt</h2>
      </Space>
    </Card>
  );
};

export default ProfileCard;
