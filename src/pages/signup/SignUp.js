import React from "react";
import { Row, Col } from "antd";

import SignUpForm from "./Form/SignUpForm";
import "./SignUp.css";

/**
 * @MatthewSclar Page for students to sign up.
 */

const SignUp = () => {
  return (
    <div className="Page">
      <Row align="middle">
        <Col md={0} lg={10}>
          <div className="ImageCard" align="center" />
        </Col>
        <Col xs={24} lg={14} align="center">
          <div className="Form">
            <SignUpForm style={{ display: "inlineBlock" }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
