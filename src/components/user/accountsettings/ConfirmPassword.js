import React, { useState } from "react";
import { Form, Input } from "antd";
import SubmitButton from "../../form/SubmitButton";
import API from "../../../api/API";

const ConfirmPassword = ({ user, setLocked }) => {
  const [error, setError] = useState(false);

  const onFinish = async (values) => {
    try {
      await API.confirmAcccount({ ...values });
      setLocked(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Form
      initialValues={{
        email: user.email,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <p>Please enter your current password to edit your account details</p>
      <Form.Item name="email" label="Email">
        <Input disabled />
      </Form.Item>
      <Form.Item name="password" label="Current Password">
        <Input.Password />
      </Form.Item>

      {error && <p className="error">Wrong password</p>}
      <SubmitButton CTA="Edit Account" />
    </Form>
  );
};

export default ConfirmPassword;
