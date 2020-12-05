import { Form, Button } from "antd";
import React from "react";

/**
 * Button linked to form
 * @param CTA the call to action on the submit button
 */
const SubmitButton = ({ CTA, disabled, loading }) => (
  <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      disabled={disabled}
      block
    >
      {CTA}
    </Button>
  </Form.Item>
);

export default SubmitButton;
