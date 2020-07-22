import React from "react";
import { Button, Space, Col } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param hideModal callback function for cancel
 * @param handleLeave callback function for remove
 */
const VideoRoomHelperModal = (props) => {
  return (
    <div className="modal-wrapper">
      <Space direction="vertical">
        <Space>
          <h2>Video Room URL</h2>
          <QuestionCircleFilled />
        </Space>
        <p>
          While meeting rooms for office hours are hosted by teaching
          assistants, <b>Woto Rooms are hosted by students.</b>
        </p>
        <p>
          In order to join, you will need to submit a link to a meeting room
          from{" "}
          <a href="https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-">
            Zoom
          </a>{" "}
          or a similar video conferencing service.
        </p>
        <Col span={24}>
          <Button onClick={props.hideModal} block>
            Ok
          </Button>
        </Col>
      </Space>
    </div>
  );
};

export default VideoRoomHelperModal;
