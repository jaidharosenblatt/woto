import React, { useState } from "react";
import { Space, Form, Input, Button } from "antd";
import UserTypeSegControl from "../../form/UserTypeSegControl";
import API from "../../../api/API";

// Update message and use trello pattern
const ForgotPasswordForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState();

  //Send post request to login based on userType
  const onFinish = async (values) => {
    setError("");
    if (values.email) {
      try {
        await API.requestResetPassword(
          { email: values.email },
          values.userType
        );
        setEmail(values.email);
      } catch (e) {
        setError("We couldn't find an account with that email address");
        console.log(e);
      }
    } else {
      setError("Please enter an email");
    }
  };

  return (
    <Space direction="vertical">
      <Form
        hideRequiredMark
        name="forgot"
        layout="vertical"
        initialValues={{ userType: "student" }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Space
            size={16}
            style={{ width: "100%" }}
            align="center"
            direction="vertical"
          >
            <h2>Reset Password</h2>
            <p>
              {email
                ? "We sent a recovery link to your email address"
                : "Enter your email and we’ll send you a link to reset your password."}
            </p>
            {email && <h2>{email}</h2>}
          </Space>
        </Form.Item>

        {!email && (
          <>
            <UserTypeSegControl />
            <Form.Item
              name="email"
              label="Email"
              help={error !== "" && error}
              validateStatus={error !== "" && "error"}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" block htmlType="submit">
                Send Reset Link
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </Space>
  );
};

export default ForgotPasswordForm;
