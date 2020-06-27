import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import API from "../../api/API";
import UserTypeSegControl from "../../components/form/UserTypeSegControl";
import AuthContext from "../../contexts/AuthContext";
//Send post request to login based on userType

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
  const context = useContext(AuthContext);

  const onFinish = async (values) => {
    const { state, dispatch } = context;
    const user = {
      email: values.email,
      password: values.password,
    };
    const type = values.userType;

    const res = await API.logIn(user, type);
    dispatch({
      type: "LOGIN",
      payload: { user: { ...user }, userType: type },
    });
    console.log(res);
  };

  const [userType, setUserType] = useState("student");
  return (
    <Form
      name="signin"
      layout="vertical"
      style={styles.form}
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
