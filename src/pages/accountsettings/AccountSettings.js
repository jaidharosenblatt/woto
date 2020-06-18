import React from "react";
import { Card, Row } from "antd";
import ProfileForm from "./ProfileForm";
import LoginForm from "./LoginForm";
import SettingsMenu from "./SettingsMenu";
import ProfileCard from "./ProfileCard";
import "./AccountSettings.css";
import CourseForm from "./CourseForm";

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
    let title = "";
    if (this.state.page === "profile") {
      form = <ProfileForm />;
      title = "Your Profile";
    }
    if (this.state.page === "login") {
      form = <LoginForm />;
      title = "Login Information";
    } else {
      form = <CourseForm />;
      title = "Your Courses";
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
          <Row>
            <Card className="FullWidth" title={<h2>{title}</h2>}>
              {form}
            </Card>
          </Row>
        </Card>
      </Row>
    );
  }
}

export default AccountSettings;
