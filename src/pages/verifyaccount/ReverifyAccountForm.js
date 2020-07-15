import React, { useContext, useState } from "react";
import { Form, Input } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import SubmitButton from "../../components/form/SubmitButton";
import API from "../../api/API";

const ReverifyAccountForm = () => {
  const { state } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const handleResetEmail = async (values) => {
    try {
      const res = await API.reverify({ email: values.email }, state.userType);
      setMessage(res.message);
      setError(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setError(true);
    }
  };

  return (
    <Form
      onFinish={handleResetEmail}
      layout="vertical"
      initialValues={state.user && { email: state.user.email }}
    >
      <Form.Item
        help={message}
        validateStatus={error ? "error" : "validating"}
        label="Email"
        name="email"
        colon={false}
      >
        <Input placeholder="Email you used" />
      </Form.Item>
      <div className="reverify-button-wrapper">
        <SubmitButton CTA="Resend verification email" />
      </div>
    </Form>
  );
};

export default ReverifyAccountForm;
