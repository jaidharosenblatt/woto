import React from "react";
import { Col, Row } from "antd";

import SignUpForm from "./SignUpForm";
import "./SignUp.css";

/**
 * @MatthewSclar Page for students to sign up.
 */

const SignUp = () => {
  return (
    <Row>
      <Col xs={0} md={10}>
        <div className="ImageCard" />
      </Col>
      <Col xs={24} md={14}>
        <div className="FormWrapper">
          <SignUpForm />
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
