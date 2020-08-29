import React, { useContext } from "react";
import { Row, Space } from "antd";
import { IdcardOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";

/**
 * @matthewsclar Page for students to recieve help for a given course
 *
 */

const GettingHelpInfo = ({ TAname, position, beingHelped }) => {
  const { state } = useContext(HelpContext);
  var text, time;

  if (beingHelped) {
    time = Math.ceil(
      Math.abs(
        new Date(state.question.assistant?.description.studentJoined) -
          new Date()
      ) / 60000
    );

    text = `Joined ${time} minutes ago`;
  } else {
    time = Math.ceil(
      Math.abs(
        new Date(state.question.assistant?.description.notifiedAt) - new Date()
      ) / 60000
    );
    text = `Notified ${time} minutes ago`;
  }

  return (
    <Space direction="vertical" size="middle">
      <h2 className="HelpingTitle">Help From {TAname}</h2>

      <Row align="left">
        <Space>
          <IdcardOutlined style={{ fontSize: "16px" }} />
          <p className="HelpingUserInfo"> {position} </p>
        </Space>
      </Row>
      <Row align="left">
        <Space>
          <ClockCircleOutlined style={{ fontSize: "16px" }} />
          <p className="HelpingUserInfo">{text}</p>
        </Space>
      </Row>
    </Space>
  );
};
export default GettingHelpInfo;
