import { Form, Input, Button, Radio } from "antd";
import React from "react";
import "./components.css";

const HelpForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item name="layout">
        <Radio.Group
          defaultValue="assignment"
          buttonStyle="solid"
          className="control"
          block
        >
          <Radio.Button className="shit" value="assignment">
            Assignment
          </Radio.Button>
          <Radio.Button value="concept">Concept</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Question" name="question" colon={false}>
        <Input placeholder="How do I reverse a linked list..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HelpForm;
