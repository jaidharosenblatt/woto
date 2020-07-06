import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param hideModal callback function for cancel
 * @param action callback function for remove
 */
const CancelQuestionModal = ({ action, hideModal }) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>Cancel Your Question</h1>
        <p>You will lose your spot in the queue</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={hideModal} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button onClick={action} block type="danger">
              Remove me
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default CancelQuestionModal;
