import React from "react";
import { Space, Avatar } from "antd";
import { ClockCircleOutlined, BellOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../../static/Images";
import LeftRightRow from "../../../components/leftrightrow/LeftRightRow";

/**
 * @matthewsclar Page for students to recieve help for a given course
 *
 */

const GettingHelpInfo = (props) => {
  const { activeQuestion } = props;

  const description = activeQuestion?.assistant?.description;
  const timeJoined =
    description?.studentJoined &&
    Math.ceil(
      Math.abs(new Date(description?.studentJoined) - new Date()) / 60000
    );

  const timeNotified =
    description?.notifiedAt &&
    Math.ceil(Math.abs(new Date(description?.notifiedAt) - new Date()) / 60000);

  return (
    <LeftRightRow
      left={
        <Space>
          <Avatar src={DefaultProfile} />
          <Space direction="vertical" size={2}>
            <p>{activeQuestion?.assistant?.description?.name}</p>
            <h3>{activeQuestion?.assistant?.description?.role}</h3>
          </Space>
        </Space>
      }
      right={
        <Space direction="vertical">
          <h3>
            <BellOutlined /> Notified {timeNotified} minutes ago
          </h3>
          {timeJoined && (
            <h3>
              <ClockCircleOutlined /> Joined {timeJoined} minutes ago
            </h3>
          )}
        </Space>
      }
    />
  );
};

export default GettingHelpInfo;
