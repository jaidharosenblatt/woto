import React from "react";
import { Button, Space, Row, Col } from "antd";
import { BellIcon } from "./tools/Icons";

/**
 * @jaidharosenblatt
 * Modal that prompts a user to confirm their enroll froma course
 * @param hideModal callback function for cancel
 * @param course that user is unenrolling from
 * @param handleUnenroll callback function for unenrolling from a course
 */
const CancelQuestionModal = (props) => {
  const code = props.course && props.course.code;
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>{`Unenroll from ${code}`}</h1>
        <p>{`You will need a new entry code to enroll back in ${code}`}</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.hideModal} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                props.handleUnenroll(props.course);
                props.hideModal();
              }}
              block
              type="danger"
            >
              Unenroll
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default CancelQuestionModal;
