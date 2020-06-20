import React from "react";
import { Form, Input, Button, Space, Row, Col } from "antd";
import SubmitButton from "../form/SubmitButton";
import { VideoIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal allows user to change their video room link
 * @param meetingRoom current meeting room
 * @param handleCancel callback function for cancel
 * @param handleEdit callback function for editing form (returns video link)
 */
const VirtualRoomModal = ({ meetingRoom, handleCancel, handleEdit }) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <VideoIcon />
        <h1>Meeting Room</h1>
        <Form
          initialValues={{ meetingRoom: meetingRoom }}
          onFinish={handleEdit}
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
              <Button block onClick={handleCancel}>
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
