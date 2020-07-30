import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param hideModal callback function for cancel
 * @param handleLeave callback function for remove
 */
const SignOffModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>Sign Off</h1>
        <p>You can join back as long as there is another TA in the session</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.hideModal} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                props.signOff();
                props.hideModal();
              }}
              block
              type="danger"
            >
              Sign Off
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default SignOffModal;
