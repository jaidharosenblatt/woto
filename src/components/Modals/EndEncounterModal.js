import React from "react";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Button, Space, Col } from "antd";
import ProfileBlock from "./tools/ProfileBlock";
import { Bell } from "../../static/Images";

const EndEncounterModal = ({ user }) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Bell} alt="active" />
        <h1>End of your turn with</h1>
        <ProfileBlock user={user} />
        <Space>
          <Button
            type="primary"
            ghost
            icon={<LikeOutlined style={{ fontSize: "100%" }} />}
          />
          <Button
            type="danger"
            ghost
            icon={<DislikeOutlined style={{ fontSize: "100%" }} />}
          />
        </Space>
      </Space>
    </Col>
  );
};

export default EndEncounterModal;
