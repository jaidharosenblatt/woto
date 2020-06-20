import React from "react";
import { Form, Input, Button, Space, Row, Col } from "antd";
import { Video } from "../../static/Images";
import SubmitButton from "../form/SubmitButton";
import TextInput from "../form/TextInput";

const onFinish = (e) => {
  console.log(e);
};
const VirtualRoomModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Video} alt="active" />
        <h1>Meeting Room</h1>

        <Form
          initialValues={{ meetingRoom: props.meetingRoom }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="meetingRoom">
            <Input placeholder="zoom.us/j/1234567890" />
          </Form.Item>
          <Row gutter={4} style={{ width: 300 }}>
            <Col span={12}>
              <SubmitButton CTA="Edit" />
            </Col>
            <Col span={12}>
              <Button block onClick={props.handleCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Space>
    </Col>
  );
};

export default VirtualRoomModal;
