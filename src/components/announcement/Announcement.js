import React from "react";
import "./announcement.css";
import { Space } from "antd";
import { WarningOutlined } from "@ant-design/icons";

/**
 * Display an announcement with a alert icon in blue div
 * @param message to display
 */
const Announcement = ({ message }) => {
  return (
    <div className="announcementContainer">
      <Space>
        <WarningOutlined />
        {message}
      </Space>
    </div>
  );
};

export default Announcement;
