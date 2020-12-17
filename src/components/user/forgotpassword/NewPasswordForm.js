import React, { useState } from "react";
import { Space, Form, Button } from "antd";
import PasswordWithConfirm from "../../form/PasswordWithConfirm";
import { Link } from "react-router-dom";
import API from "../../../api/API";

// Update message and use trello pattern
const NewPasswordForm = () => {
  const [status, setStatus] = useState();

  const path = window.location.pathname; //url of the current page
  const split = path.split("/"); //this creates an array with key ([0] element) and value ([1] element)
  const userType = split[2];
  const key = split[3].split("=")[1];

  console.log(key);

  //Send post request to login based on userType
  const onFinish = async (values) => {
    try {
      await API.resetPassword(
        {
          token: key,
          newPassword: values.password,
        },
        userType
      );
      setStatus("success");
    } catch (e) {
      setStatus("error");
      console.log(e);
    }
  };

  return (
    <Space direction="vertical">
      <Form
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
              {!status && "Please enter a new password"}
              {status === "success" && "Password successfully changed"}
              {status === "error" &&
                "Unable to update password. Please try again"}
            </p>
          </Space>
        </Form.Item>

        {!status && (
          <>
            <PasswordWithConfirm required />
            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" block htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </>
        )}
        {status === "success" && (
          <Link to="/signin">
            <Button type="primary" block>
              Sign in
            </Button>
          </Link>
        )}
        {status === "error" && (
          <Link to="/forgot">
            <Button type="primary" block>
              Reset Password
            </Button>
          </Link>
        )}
      </Form>
    </Space>
  );
};

export default NewPasswordForm;
