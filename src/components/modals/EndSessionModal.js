import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param hideModal callback function for cancel
 * @param handleLeave callback function for remove
 */
const EndSessionModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>End This Session</h1>
        <p>
          This will remove all students from the queue and archive this session
        </p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.hideModal} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                props.endSession();
                props.hideModal();
              }}
              block
              type="danger"
            >
              End Session
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default EndSessionModal;
