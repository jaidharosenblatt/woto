import React from "react";
import { Form, Input } from "antd";
import SubmitButton from "../../components/form/SubmitButton";
import auth from "../../redux/auth/actionCreators";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

const ReverifyAccountForm = (props) => {
  const handleResetEmail = async ({ email }) => {
    await props.reverifyEmail(email);
  };
  let message;
  if (props.success) {
    message = props.success;
  }
  if (props.error) {
    message = props.error;
  }

  return (
    <Form
      onFinish={handleResetEmail}
      layout="vertical"
      initialValues={props.user && { email: props.user.email }}
    >
      <Form.Item
        help={message}
        validateStatus={props.error ? "error" : "validating"}
        label="Email"
        name="email"
        colon={false}
      >
        <Input placeholder="Email you used" />
      </Form.Item>
      <div className="reverify-button-wrapper">
        <SubmitButton loading={props.loading} CTA="Resend verification email" />
      </div>
    </Form>
  );
};

const { reverifyEmail } = auth;
const mapStateToProps = (state) => {
  return {
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
    success: selectors.getSuccessMessage(state),
    error: selectors.getError(state),
  };
};
export default connect(mapStateToProps, { reverifyEmail })(ReverifyAccountForm);
