import React from "react";
import { Form } from "antd";
import TextInput from "../../components/form/TextInput";

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
        firstName: "First Name",
        lastName: "Last Name",
        problem: 1,
        collaborate: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <TextInput label="First Name" name="firstName" />
      <TextInput label="Last Name" name="lastName" />
    </Form>
  );
};

export default ProfileForm;
