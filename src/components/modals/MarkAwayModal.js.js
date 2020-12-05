import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that prompts a user to confirm their cancellation of a question
 * @param {props} hideModal callback function for cancel
 * @param {props} markAway callback to mark away
 * @param {props} name
 */
const MarkAwayModal = (props) => {
  const name = props.name || "Student";
  return (
    <Col align="middle" className="modal-wrapper-large">
      <Space direction="vertical">
        <BellIcon />
        <h1>Mark {name} as Away</h1>
        <p>
          If {name} left your virtual meeting room, you can mark them away in
          order to open your group up to more students
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
                props.markAway();
                props.hideModal();
              }}
              block
              type="danger"
            >
              Mark {name} as Away
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default MarkAwayModal;
