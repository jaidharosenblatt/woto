import React, { useState } from "react";
import "./announcement.css";
import { Row, Col } from "antd";
import {
  NotificationOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  PushpinOutlined,
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

  var extraFields = [];

  /*If user is a student, they are only allowed to hide announcements temporarily.
   *It is also possible that they are a TA, in which case they can only close their own announcements.
   */
  if (user === "student") {
    if (disableDelete === false) {
      extraFields.push(
        <CloseCircleOutlined onClick={() => handleClose(item)} />
      );
    } else {
      extraFields.push(
        <CloseCircleOutlined onClick={() => setVisible(false)} />
      );
    }
  }

  //If user is an instructor, they are only allowed to both pin and close any announcement
  if (user === "instructor") {
    extraFields.push(<CloseCircleOutlined onClick={() => handleClose(item)} />);
    extraFields.push(<PushpinOutlined onClick={() => console.log(item)} />);
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
              {!alert && { extraFields }}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Announcement;
