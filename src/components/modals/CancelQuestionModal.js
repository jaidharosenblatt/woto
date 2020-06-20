import React from "react";
import { Button, Space, Row, Col } from "antd";
import { Bell } from "../../static/Images";

const CancelQuestionModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Bell} alt="active" />
        <h1>Cancel your question</h1>
        <p>You will lose your spot in the queue</p>
        <Row gutter={4}>
          <Col span={12}>
            <Button onClick={props.handleCancel} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button block type="danger">
              Remove me
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default CancelQuestionModal;
