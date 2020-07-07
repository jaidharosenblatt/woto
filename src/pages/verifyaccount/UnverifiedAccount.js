import React, { useContext, useState } from "react";
import { Form, Col, Input } from "antd";
import { EmailImage } from "../../static/Images";
import { AuthContext } from "../../contexts/AuthContext";
import SubmitButton from "../../components/form/SubmitButton";
import API from "../../api/API";

const UnverifiedAccount = () => {
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
    <Col span={24}>
      <div>
        <h2 className="verify-failed">
          Please verify your account to in order to access your courses
        </h2>
        <div>
          <Form
            onFinish={handleResetEmail}
            layout="vertical"
            initialValues={{ email: state.user.email }}
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
            <SubmitButton CTA="Resend verification email" />
          </Form>
        </div>
      </div>
      <img className="hero-image" alt="hero" src={EmailImage} />
    </Col>
  );
};

export default UnverifiedAccount;
