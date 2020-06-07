import { Form, Button } from "antd";
import React from "react";

const SubmitButton = () => (
  <Form.Item>
    <Button type="primary" htmlType="submit" block>
      Submit
    </Button>
  </Form.Item>
);

export default SubmitButton;
