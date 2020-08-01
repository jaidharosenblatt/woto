import React, { useState, useContext } from "react";
import { Space, Form, Input, Button } from "antd";
import API from "../../api/API";
import UserTypeSegControl from "../../components/form/UserTypeSegControl";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @tommytilton @jaidharosenblatt form prompting user
 * for their email and password
 */
const SignInForm = ({ id }) => {
  const [error, setError] = useState("");
  const context = useContext(AuthContext);

  //handle form error
  const onFinishFailed = () => {
    setError("Please input your password");
  };

  //Send post request to login based on userType
  const onFinish = async (values) => {
    const user = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    //instructor or assistant/student
    const type = values.userType;
    try {
      const loggedInUser = await API.logIn(user, type);
      context.dispatch({
        type: "LOGIN",
        payload: { user: { ...loggedInUser }, userType: type },
      });
      setError("");
      window.location.reload();
    } catch (e) {
      //Catch 500 error
      setError("You have entered an invalid username or password");
      console.log(e);
    }
  };

  return (
    <Space direction="vertical">
      <Form
        name={id}
        layout="vertical"
        initialValues={{ userType: "student" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <UserTypeSegControl />
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          help={error}
          validateStatus={error !== "" ? "error" : "validating"}
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" block htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default SignInForm;
