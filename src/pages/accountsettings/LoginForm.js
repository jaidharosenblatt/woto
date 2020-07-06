import React from "react";
import { Form, Input } from "antd";
import SubmitButton from "../../components/form/SubmitButton";
import { PasswordInput } from "antd-password-input-strength";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ProfileForm = ({ user }) => {
  return (
    <Form
      initialValues={{
        email: user.email,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="currentPassword" label="Current Password">
        <Input.Password />
      </Form.Item>
      <Form.Item name="newPassword" label="New Password">
        <PasswordInput />
      </Form.Item>
      <SubmitButton CTA="Edit Account" />
    </Form>
  );
};

export default ProfileForm;
