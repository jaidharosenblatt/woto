import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";

import UserTypeSegControl from "../../form/UserTypeSegControl";
import { login } from "../../../redux/auth/actionCreators";
import { loadCourses } from "../../../redux/courses/actions/student";

import selectors from "../../../redux/selectors";
import ErrorSuccess from "../../util-components/error-success/ErrorSuccess";

/**
 * Login form for users
 * @param {Boolean} loading global loading state
 * @param {Boolean} error error from server
 * @param {Boolean} isAuthenticated whether login was successful
 * @param {Function} login actionCreator for logging in
 * @param {Function} loadCourses actionCreator for loading courses
 * @param {Function} setError actionCreator for setting error
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
    <Form
      layout="vertical"
      initialValues={{ userType: "student" }}
      onFinish={onFinish}
      hideRequiredMark
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
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input.Password />
      </Form.Item>

      <ErrorSuccess />

      <Form.Item style={{ margin: 0 }}>
        <Button loading={props.loading} type="primary" block htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: selectors.getLoading(state),
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps, { login, loadCourses })(SignInForm);
