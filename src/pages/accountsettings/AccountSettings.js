import React from "react";
import { Card, Row, Space } from "antd";
import ProfileForm from "./ProfileForm";
import LoginForm from "./LoginForm";
import SettingsMenu from "./SettingsMenu";
import ProfileCard from "./ProfileCard";
import "./AccountSettings.css";
import EditCourses from "./EditCourses";

class AccountSettings extends React.Component {
  constructor() {
    super();
    this.state = { page: "profile" };
  }

  onPageChange = (e) => {
    this.setState({ page: e.key });
  };

  render() {
    let form = null;
    if (this.state.page === "profile") {
      form = (
        <Card className="FullWidth" title={<h2>Your Profile</h2>}>
          <ProfileForm />
        </Card>
      );
    }
    if (this.state.page === "login") {
      form = (
        <Card className="FullWidth" title={<h2>Login Information</h2>}>
          <LoginForm />
        </Card>
      );
    }
    if (this.state.page === "courses") {
      form = (
        <Space className="FullWidth" direction="vertical" align="middle">
          <EditCourses title="Active Courses" button="Unenroll" active />
          <EditCourses title="Inactive Courses" />
        </Space>
      );
    }

    return (
      <Row align="center">
        <Card style={{ width: 700 }}>
          <Row align="center">
            <SettingsMenu
              selectedKey={[this.state.page]}
              onChange={this.onPageChange}
            />
          </Row>
          <Row>
            <ProfileCard />
          </Row>
          <Row>{form}</Row>
        </Card>
      </Row>
    );
  }
}

export default AccountSettings;
