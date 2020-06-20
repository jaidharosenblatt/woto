import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param handleCancel callback function for cancel
 * @param handleClear callback function for clear
 * @param queueSize current size of the queue
 */
const ClearQueueModal = (props) => {
  const queueSize = props.queueSize === undefined ? 0 : props.queueSize;
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1 style={{ width: 200 }}>Clear Queue</h1>
        <p> {`There are ${queueSize} students in the queue`}</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.handleCancel} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button onClick={props.handleClear} block type="danger">
              Clear Queue
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default ClearQueueModal;
