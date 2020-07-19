import React, { useState } from "react";
import { Space, Form, Input, Button } from "antd";
import UserTypeSegControl from "../../components/form/UserTypeSegControl";
import API from "../../api/API";

const ForgotPasswordForm = () => {
  const [error, setError] = useState("");

  //handle form error
  const onFinishFailed = (errorInfo) => {
    setError("Please input an email");
    console.log("Failed:", errorInfo);
  };

  //Send post request to login based on userType
  const onFinish = async (values) => {
    try {
      setError("");
      window.location.reload();
    } catch (e) {
      setError("You have entered an invalid username or password");
      console.log(e);
    }
  };

  const [userType, setUserType] = useState("student");
  return (
    <Space direction="vertical">
      <Form
        name="signin"
        layout="vertical"
        initialValues={{ userType: userType }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <UserTypeSegControl
          handleChange={(event) => {
            setUserType(event.target.value);
          }}
        />
        <Form.Item
          name="email"
          label="Email"
          help={error}
          validateStatus={error !== "" ? "error" : "validating"}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" block htmlType="submit">
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default ForgotPasswordForm;
