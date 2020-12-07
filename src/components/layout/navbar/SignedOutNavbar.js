import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Space } from "antd";
import { LogoWhite } from "../../../static/LoadedImages";
import "./NavBar.css";

/**
 * @kadenrosenblatt navbar to show when user is not logged in.
 * Prompts user to sign in/sign up
 */
const SignedOut = () => {
  return (
    <div className="navbar-wrapper">
      <Row
        className="signedout-navbar"
        align="middle"
        style={{
          height: "68px",
          backgroundColor: "#40A9FF",
          padding: " 0 20px",
        }}
      >
        <Col span={8}>
          <Link to="/">
            <LogoWhite className="Logo" />
          </Link>
        </Col>
        <Col span={16} align="right">
          <Space>
            <Link to="/signin">
              <Button type="primary">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button ghost>Sign Up</Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SignedOut;
