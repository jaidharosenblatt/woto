import React, { useContext, useState, useEffect } from "react";
import { Form, Col, Button, Input } from "antd";
import { EmailImage } from "../../static/Images";
import { AuthContext } from "../../contexts/AuthContext";
import TextInput from "../../components/form/TextInput";
import SubmitButton from "../../components/form/SubmitButton";
import API from "../../api/API";

// var url = window.location;
// ex: http://localhost:3000/verify/student/#key=084758yhroufgbk48y
//TODO have failed screen
const UnverifiedAccount = () => {
  const { state } = useContext(AuthContext);

  const handleResetEmail = (values) => {
    try {
      API.reverify({ email: values.email }, state.userType);
      //   console.log(res.value);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Col span={24} align="center">
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
            <TextInput
              label="Email"
              name="email"
              placeholder="Email you used"
            />
            <SubmitButton CTA="Resend verification email" />
          </Form>
        </div>
      </div>
      <img className="hero-image" alt="hero" src={EmailImage} />
    </Col>
  );
};

export default UnverifiedAccount;
