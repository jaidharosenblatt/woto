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
    <Col align="middle" className="modal-wrapper">
      <Space direction="vertical" style={{ width: "100%" }}>
        <BellIcon />
        <h1>Leave This Room</h1>
        <p>You can always join back</p>
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
              Leave Room
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default LeaveWotoModal;
