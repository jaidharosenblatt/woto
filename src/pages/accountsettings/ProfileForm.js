import React from "react";
import { Form, InputNumber } from "antd";
import TextInput from "../../components/form/TextInput";
import TagSelect from "../../components/form/TagSelect";
import SubmitButton from "../../components/form/SubmitButton";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const majors = ["Computer Science", "Economics", "Electrical Engineering"];

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
      <TextInput label="First Name" name="firstName" />
      <TextInput label="Last Name" name="lastName" />
      <Form.Item label="Graduation Year" name="graduationYear">
        <InputNumber min={2020} max={2300} placeholder="2020" />
      </Form.Item>
      <TagSelect tags={majors} label="Major(s)" name="major" />
      <TagSelect tags={majors} label="Minor(s)" name="minor" />
      <SubmitButton CTA="Edit Profile" />
    </Form>
  );
};

export default ProfileForm;
