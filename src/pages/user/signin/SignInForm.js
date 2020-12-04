import React from "react";
import { Space, Form, Input, Button } from "antd";
import { connect } from "react-redux";

import UserTypeSegControl from "../../../components/form/UserTypeSegControl";
import { login } from "../../../redux/auth/actionCreators";
import { loadCourses } from "../../../redux/courses/actions/student";

import { setCustomError } from "../../../redux/status/actionCreators";

import selectors from "../../../redux/selectors";

/**
 * Login form for users
 * @param {Boolean} loading global loading state
 * @param {Boolean} error error from server
 * @param {Boolean} isAuthenticated whether login was successful
 * @param {Function} login actionCreator for logging in
 * @param {Function} loadCourses actionCreator for loading courses
 * @param {Function} setCustomError actionCreator for setting error
 */
const SignInForm = (props) => {
  const onFinish = async (values) => {
    const user = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    //instructor or assistant/student
    const type = values.userType;
    await props.login(user, type);
  };

  return (
    <Space direction="vertical">
      <Form
        layout="vertical"
        initialValues={{ userType: "student" }}
        onFinish={onFinish}
        onFinishFailed={() =>
          props.setCustomError("Please input your password")
        }
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
          help={props.error}
          validateStatus={props.error ? "error" : "validating"}
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button
            loading={props.loading}
            type="primary"
            block
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: selectors.getLoading(state),
    error: selectors.getError(state),
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps, { login, setCustomError, loadCourses })(
  SignInForm
);
