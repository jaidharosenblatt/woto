import React from "react";
import { Menu, Card, Row, Col } from "antd";
import { UserOutlined, UnlockOutlined, DiffOutlined } from "@ant-design/icons";

const menu = (
  <Menu style={{ background: "none", borderBottom: "0px" }} mode="horizontal">
    <Menu.Item key="profile">
      <UserOutlined />
      Profile
    </Menu.Item>
    <Menu.Item key="login">
      <UnlockOutlined />
      Login
    </Menu.Item>
    <Menu.Item key="courses">
      <DiffOutlined />
      Courses
    </Menu.Item>
  </Menu>
);
const AccountSettings = () => {
  return (
    <Row align="center">
      <Card>
        <Row align="center">{menu}</Row>
        <Row>
          <Col>
            <Card>hiii</Card>
          </Col>
          <Col>
            <Card>hiii</Card>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default AccountSettings;
