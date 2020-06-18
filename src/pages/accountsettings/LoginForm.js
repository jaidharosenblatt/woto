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

const ProfileForm = () => {
  return (
    <Form
      initialValues={{
        firstName: "Jaidha",
        lastName: "Rosenblatt",
        graduationYear: 2021,
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
      <SubmitButton CTA="Edit Profile" />
    </Form>
  );
};

export default ProfileForm;
