import React from "react";
import { Button, Row, Col, Space } from "antd";
import { Logo } from "../../static/Images";

const NavBarNotSignedIn = () => {
  return (
    <Row justify="center">
      <Col span={6} pull={6}>
        <img
          src={Logo}
          alt="logo"
          style={{ width: "100px", marginLeft: "10px", marginTop: "10px" }}
        />
      </Col>
      <Col span={6} push={6}>
        <div style={{ marginTop: "10px" }}>
          <Space>
            <Button type="primary">Sign In</Button>
            <Button>Sign Up</Button>
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default NavBarNotSignedIn;
