import React from "react";
import { Col, Row, Space } from "antd";
import { Logo } from "../../static/Images";

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
          <Col>
            <Space
              direction="vertical"
              align="center"
              style={{ marginBottom: "16px" }}
            >
              <img className="WotoLogo" src={Logo} alt="Woto Logo" />
              <h2>
                Be among the first to&nbsp;
                <b style={{ fontStyle: "bold", color: "#40a9ff" }}>
                  revolutionize&nbsp;
                </b>
                office hours
              </h2>
            </Space>
            <Row>
              <SignUpForm />
            </Row>
          </Col>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;