import React from "react";
import { Row, Space } from "antd";
import { ClockImage, PersonOutline } from "../../../static/Images";

/**
 * @matthewsclar Page for students to recieve help for a given course
 *
 */

const GettingHelpInfo = ({ TAname, position, time }) => {
  return (
    <div>
      <h2 className="HelpingTitle">
        <b> Help From {TAname} </b>
      </h2>
      <Space direction="vertical">
        <Row align="left">
          <Space>
            <img className="HelpingPerson" src={PersonOutline} alt="person" />
            <p className="HelpingUserInfo"> {position} </p>
          </Space>
        </Row>
        <Row align="left">
          <Space>
            <img className="HelpingClock" src={ClockImage} />
            <p className="HelpingUserNotifiedInfo">
              {" "}
              Notified {time} minutes ago{" "}
            </p>
          </Space>
        </Row>
      </Space>
    </div>
  );
};
export default GettingHelpInfo;
