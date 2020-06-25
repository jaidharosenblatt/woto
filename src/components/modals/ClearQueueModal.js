import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";
import ClearQueueContext from "../../contexts/ClearQueueContext";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param handleAction callback function for any clicks
 * @param {context} queueSize size of queue before clear
 * @param {context} handleClear callback to clear queue
 */
class ClearQueueModal extends React.Component {
  static contextType = ClearQueueContext;

  render() {
    return (
      <Col align="middle" onClick={this.props.handleAction}>
        <Space direction="vertical">
          <BellIcon />
          <h1 style={{ width: 200 }}>Clear Queue</h1>
          <p> {`There are ${this.context.queueSize} students in the queue`}</p>
          <Row gutter={4}>
            <Col span={12}>
              <Button block>Cancel</Button>
            </Col>
            <Col span={12}>
              <Button onClick={this.context.handleClear} block type="danger">
                Clear Queue
              </Button>
            </Col>
          </Row>
        </Space>
      </Col>
    );
  }
}

export default ClearQueueModal;
