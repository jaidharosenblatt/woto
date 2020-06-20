import React from "react";
import { Col, Row, Space } from "antd";
import { Link } from "react-router-dom";

import { Logo } from "../../static/Images";
import SignUpForm from "./SignUpForm";
import "./SignUp.css";

const styles = {
  logoWrapper: { marginBottom: "16px" },
  emphasize: { color: "#40a9ff" },
};

/**
 * @MatthewSclar Page for students to sign up.
 *Uses: SignUpForm component
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
              style={styles.logoWrapper}
            >
              <Link to="/">
                <img className="WotoLogo" src={Logo} alt="Woto Logo" />
              </Link>
              <h2>
                Be among the first to{" "}
                <b style={styles.emphasize}>revolutionize</b> office hours
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
