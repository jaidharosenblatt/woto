import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Space } from "antd";
import { LogoWhite } from "../../static/Images";
import "./NavBar.css";

/**
 * @kadenrosenblatt navbar to show when user is not logged in.
 * Prompts user to sign in/sign up
 */
const SignedOut = () => {
  return (
    <Row align="middle" style={{ height: "68px", backgroundColor: "#40A9FF" }}>
      <Col span={8}>
        <Link to="/">
          <img src={LogoWhite} alt="logo" className="Logo" />
        </Link>
      </Col>
      <Col span={16} align="right">
        <Space>
          <Link to="/signin">
            <Button type="primary">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </Space>
      </Col>
    </Row>
  );
};

export default SignedOut;
