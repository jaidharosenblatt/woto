import React from "react";
import { Menu, Card, Row, Col, Space } from "antd";
import { UserOutlined, UnlockOutlined, DiffOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import ProfileForm from "./ProfileForm";
const styles = { avatar: { width: "40%", borderRadius: "100px" } };
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

const profileCard = (
  <Card>
    <Space direction="vertical" align="center">
      <img src={DefaultProfile} alt="avatar" style={styles.avatar} />
      <h2 style={styles.h2}>Jaidha Rosenblatt</h2>
    </Space>
  </Card>
);
const AccountSettings = () => {
  return (
    <Row align="center">
      <Card>
        <Row align="center">{menu}</Row>
        <Row>
          <Col align="center" xs={10} lg={14}>
            {profileCard}
          </Col>
          <Col>
            <Card>
              <ProfileForm />
            </Card>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default AccountSettings;
