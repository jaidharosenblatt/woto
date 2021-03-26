import React, { useState } from "react";
import "./announcement.css";
import { Row, Col, Tooltip, Space, Button } from "antd";
import {
  NotificationOutlined,
  CloseCircleOutlined,
  PushpinOutlined,
  PushpinFilled,
  VideoCameraFilled,
} from "@ant-design/icons";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";

/**
 * @jaidharosenblatt Display an announcement with a alert icon in blue div
 * Able to be closed by clicking on X
 * @param message to display
 * @param announcement display a yellow alert instead of announcement
 * @param handleClose callback that handles closing an announcement permanently
 * @param handlePin callback that handles when an instructor pins annoucement to course attributes
 */
const Announcement = (props) => {
  const [visible, setVisible] = useState(true);

  const {
    userIsInstructor,
    announcement,
    handleClose,
    handlePin,
    userID,
  } = props;

  const isOwner = userID === announcement?.ownerId;
  const name = isOwner ? "Your" : `${announcement?.ownerName.split(" ")[0]}'s`;
  const hasEditPermission = userIsInstructor || isOwner;

  const handleHideClose = () => {
    if (hasEditPermission) {
      handleClose(announcement);
    } else {
      setVisible(false);
    }
  };

  const iconStyle = announcement.meetingURL ? { fontSize: 24 } : {};

  if (visible) {
    return (
      <div className="announcement-container">
        <Row align="middle">
          <Col span={2}>
            <NotificationOutlined style={iconStyle} />
          </Col>
          <Col span={20}>
            <Space direction="vertical" size={0}>
              <Space size={4}>
                {name} Message:
                {announcement?.announcement}
              </Space>

              {announcement.meetingURL && (
                <Button
                  type="primary"
                  href={announcement?.meetingURL}
                  target="_blank"
                >
                  <VideoCameraFilled /> Join {name} Video Room
                </Button>
              )}
            </Space>
          </Col>
          <Col span={2}>
            <Space>
              {userIsInstructor && (
                <Tooltip placement="left" title="Pin message">
                  {announcement.pinned ? (
                    <PushpinFilled
                      style={iconStyle}
                      onClick={() => handlePin(announcement)}
                    />
                  ) : (
                    <PushpinOutlined
                      style={iconStyle}
                      onClick={() => handlePin(announcement)}
                    />
                  )}
                </Tooltip>
              )}
              <Tooltip
                placement="left"
                title={
                  hasEditPermission
                    ? `Delete ${name.toLowerCase()} message`
                    : "Hide message"
                }
              >
                <CloseCircleOutlined
                  style={iconStyle}
                  onClick={handleHideClose}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state, pastProps) => {
  return {
    ...pastProps,
    userIsInstructor: selectors.userIsInstructor(state),
    userID: selectors.getUserID(state),
  };
};

export default connect(mapStateToProps)(Announcement);
