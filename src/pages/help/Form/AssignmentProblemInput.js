import React from "react";
import { Form, InputNumber, Row, Col } from "antd";

/**
 * @jaidharosenblatt Two side by side inputs for Assignment and Problem
 */
const AssignmentProblemInput = () => {
  return (
    <Row gutter={4}>
      <Col span={12}>
        <Form.Item label="Assignment" name="assignment" colon={false}>
          <InputNumber style={{ width: "100%" }} min={0} max={10} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Problem" name="problem" colon={false}>
          <InputNumber style={{ width: "100%" }} min={0} max={10} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AssignmentProblemInput;
