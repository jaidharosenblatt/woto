import React from "react";
import { Button, Space, Row, Col } from "antd";
import { Bell } from "../../static/Images";
import ProfileBlock from "./tools/ProfileBlock";

const CancelQuestionModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Bell} alt="active" />
        <h1>Cancel your question</h1>
        <p>You will lose your spot in the queue</p>
        <ProfileBlock user={props.user} />
        <Row gutter={4}>
          <Col span={12}>
            <Button block>Cancel</Button>
          </Col>
          <Col span={12}>
            <Button block type="danger" onClick={props.handleCancel}>
              Remove me
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default CancelQuestionModal;
