import React, { useState } from "react";
import "./announcement.css";
import { Row, Col, Tooltip, Space } from "antd";
import {
  NotificationOutlined,
  CloseCircleOutlined,
  PushpinOutlined,
  PushpinFilled,
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

  const handleHideClose = () => {
    if (userIsInstructor) {
      handleClose(announcement);
    } else {
      setVisible(false);
    }
  };

  if (visible) {
    return (
      <div className="announcement-container">
        <Row align="middle">
          <Col xs={2} md={1} align="left">
            <NotificationOutlined />
          </Col>
          <Col xs={20} md={21} align="left">
            {`${name} Announcement: ${announcement?.announcement} ${announcement?.meetingURL}`}
          </Col>
          <Col span={2} align="right">
            <Space>
              {userIsInstructor && (
                <Tooltip placement="left" title="Pin announcement">
                  {announcement.pinned ? (
                    <PushpinFilled onClick={() => handlePin(announcement)} />
                  ) : (
                    <PushpinOutlined onClick={() => handlePin(announcement)} />
                  )}
                </Tooltip>
              )}
              <Tooltip
                placement="left"
                title={
                  userIsInstructor
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
