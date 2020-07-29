import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param hideModal callback function for cancel
 * @param handleLeave callback function for remove
 */
const LeaveWotoModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>Remove Your Woto Room</h1>
        <p>You will not lose your spot in the office hour TA queue</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.hideModal} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                props.handleLeave();
                props.hideModal();
              }}
              block
              type="danger"
            >
              Remove me
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default LeaveWotoModal;
