import React, { useState, useContext } from "react";
import "./announcement.css";
import { Row, Col, Tooltip, Space } from "antd";
import {
  NotificationOutlined,
  CloseCircleOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../contexts/AuthContext";
/**
 * @jaidharosenblatt Display an announcement with a alert icon in blue div
 * Able to be closed by clicking on X
 * @param message to display
 * @param announcement display a yellow alert instead of announcement
 * @param handleClose callback that handles closing an announcement permanently
 */
const Announcement = ({ announcement, handleClose }) => {
  const { state } = useContext(AuthContext);
  const [visible, setVisible] = useState(true);

  const isOwner = state.user._id === announcement.ownerId;
  const enableDelete = state.userTyper === "instructor" || isOwner;
  const name = isOwner ? "Your" : `${announcement.ownerName}'s`;

  const handleHideClose = () => {
    if (enableDelete) {
      handleClose(announcement);
    } else {
      setVisible(false);
    }
  };

  const handlePin = () => {
    console.log(announcement);
  };

  return (
    <>
      {visible && (
        <div className="announcement-container">
          <Row align="middle">
            <Col xs={2} md={1} align="left">
              <NotificationOutlined />
            </Col>
            <Col xs={20} md={21} align="left">
              {`${name} Announcement: ${announcement.announcement}`}
            </Col>
            <Col span={2} align="right">
              <Space>
                {state.userType === "instructor" && (
                  <Tooltip placement="left" title="Pin announcement">
                    <PushpinOutlined onClick={handlePin} />
                  </Tooltip>
                )}
                <Tooltip
                  placement="left"
                  title={
                    enableDelete
                      ? `Delete ${name.toLowerCase()} announcement`
                      : "Hide announcement"
                  }
                >
                  <CloseCircleOutlined onClick={handleHideClose} />
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Announcement;
