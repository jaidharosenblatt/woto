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
 * @param handleClose callback that handles closing an announcement permanently
 * @param user is the userType used for displaying the
 * @param disableDelete boolean that allows only owners of the announcements to delete them
 */
const Announcement = ({ alert, item, handleClose, user, disableDelete }) => {
  const [visible, setVisible] = useState(true);
  const message = item.announcement;
  var enableDelete;
  if (user === "student") {
    enableDelete = false;
  } else if (disableDelete === false) {
    enableDelete = true;
  }

  return (
    <>
      {visible && (
        <div className={`announcement-container${alert ? "-alert" : ""}`}>
          <Row align="middle">
            <Col xs={2} md={1} align="left">
              {alert ? <WarningOutlined /> : <NotificationOutlined />}
            </Col>
            <Col xs={20} md={21} align="left">
              {message}
            </Col>
            <Col span={2} align="right">
              {!alert &&
                (enableDelete ? (
                  <CloseCircleOutlined onClick={() => handleClose(item)} />
                ) : (
                  <CloseCircleOutlined onClick={() => setVisible(false)} />
                ))}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Announcement;
