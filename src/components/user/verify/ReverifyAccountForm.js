import React from "react";
import { Form, Input } from "antd";
import SubmitButton from "../../form/SubmitButton";
import { reverifyEmail } from "../../../redux/auth/actionCreators";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import ErrorSuccess from "../../util-components/error-success/ErrorSuccess";

const ReverifyAccountForm = (props) => {
  const handleResetEmail = async ({ email }) => {
    await props.reverifyEmail(email);
  };

  return (
    <Form
      onFinish={handleResetEmail}
      layout="vertical"
      initialValues={props.user && { email: props.user.email }}
    >
      <Form.Item label="Email" name="email" colon={false}>
        <Input placeholder="Email you used" />
      </Form.Item>
      <ErrorSuccess showSuccess />
      <div className="reverify-button-wrapper">
        <SubmitButton loading={props.loading} CTA="Resend verification email" />
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};
export default connect(mapStateToProps, { reverifyEmail })(ReverifyAccountForm);
