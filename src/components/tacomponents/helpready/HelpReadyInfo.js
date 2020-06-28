import React from "react";
import { Row, Space } from "antd";
import {IdcardOutlined, ClockCircleOutlined} from '@ant-design/icons';

/**
 * @matthewsclar Page for students to recieve help for a given course
 *
 */

const GettingHelpInfo = ({ TAname, position, time }) => {

  return (
    <Space direction="vertical">
      <h2 className="HelpingTitle">
        <b> Help From {TAname} </b>
      </h2>

        <Row align="left">
          <Space>
            <IdcardOutlined style={{fontSize: '20px'}}/>
            <p className="HelpingUserInfo"> {position} </p>
          </Space>
        </Row>
        <Row align="left">
          <Space>
            <ClockCircleOutlined style={{fontSize: '20px'}} />
            <p className="HelpingUserNotifiedInfo">
              Notified {time} minutes ago
            </p>
          </Space>
        </Row>
      </Space>

  );
};
export default GettingHelpInfo;
