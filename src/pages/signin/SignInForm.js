import React, { useState, useContext } from "react";
import { Space, Form, Input, Button, Alert } from "antd";
import { withRouter, Link } from "react-router-dom";
import API from "../../api/API";
import UserTypeSegControl from "../../components/form/UserTypeSegControl";
import { AuthContext } from "../../contexts/AuthContext";
import "./SignIn.css";

/**
 * @tommytilton @jaidharosenblatt form prompting user
 * for their email and password
 */
const SignInForm = (props) => {
  const [error, setError] = useState("");
  const context = useContext(AuthContext);

  //handle form error
  const onFinishFailed = (errorInfo) => {
    setError("Please input your password");
    console.log("Failed:", errorInfo);
  };

  //Send post request to login based on userType
  const onFinish = async (values) => {
    const user = {
      email: values.email,
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
      console.log(context.state);
      //redirect to home
      props.history.push("/");
    } catch (e) {
      //Catch 500 error
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

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
        <p>
          Don't have an account?
          <Link to={"/signup"}> Sign up here </Link>
        </p>
      </Form>
    </Space>
  );
};

export default withRouter(SignInForm);
