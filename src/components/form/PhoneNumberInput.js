import React from "react";
import { Form, InputNumber } from "antd";
import "./form.css";

/**
 * @jaidharosenblatt number input without steps used
 * for phone number
 */
const PhoneNumberInput = () => {
  return (
    <Form.Item name="phone" label="Phone Number">
      <InputNumber type="number" className="HiddenStep" />
    </Form.Item>
  );
};

export default PhoneNumberInput;
