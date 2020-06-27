import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import API from "../../api/API";
import RoleSegControl from "../../components/form/RoleSegControl";

//Send post request to login based on role
const onFinish = async (user) => {
  console.log(user);
  const res = await API.logIn(
    {
      email: user.email,
      password: user.password,
    },
    user.role
  );
  console.log(res);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const styles = {
  form: { width: "100vw", maxWidth: "600px", padding: "16px" },
  footer: { marginBottom: "8px" },
};
/**
 * @tommytilton @jaidharosenblatt form prompting user
 * for their email and password
 */
const SignInForm = () => {
  const [role, setRole] = useState("student");
  return (
    <Form
      name="signin"
      layout="vertical"
      style={styles.form}
      initialValues={{ role: role }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <RoleSegControl
        handleRoleSelect={(event) => {
          setRole(event.target.value);
        }}
      />
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your Email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your Password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={styles.footer}>
        <Button type="primary" block htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
      <p>
        Don't have an account?
        <Link to={"/signup"}> Sign up here </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
