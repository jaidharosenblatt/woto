import React, { useState } from "react";
import "./announcement.css";
import { Row, Col } from "antd";
import {
  NotificationOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

/**
 * @jaidharosenblatt Display an announcement with a alert icon in blue div
 * Able to be closed by clicking on X
 * @param message to display
 * @param alert display a yellow alert instead of announcement
 */
const Announcement = ({ alert, message }) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <div className={`announcement-container${alert ? "-alert" : ""}`}>
          <Row align="middle">
            <Col xs={2} md={1} align="left">
              {alert ? <WarningOutlined /> : <NotificationOutlined />}
            </Col>
            <Col xs={20} md={21} align="left">
              {alert ? message : `TA Announcement: ${message}`}
            </Col>
            <Col span={2} align="right">
              {!alert && (
                <CloseCircleOutlined onClick={() => setVisible(false)} />
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Announcement;
