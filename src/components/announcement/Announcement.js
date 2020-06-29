import React, { useState } from "react";
import "./announcement.css";
import { Space } from "antd";
import { WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";

/**
 * Display an announcement with a alert icon in blue div
 * @param message to display
 */
const Announcement = ({ message }) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <div className="announcement-container">
          <div className="announcement-inner">
            <Space>
              <WarningOutlined />
              {message}
            </Space>
            <div
              className="exit-announcement"
              onClick={() => setVisible(false)}
            >
              <CloseCircleOutlined />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
