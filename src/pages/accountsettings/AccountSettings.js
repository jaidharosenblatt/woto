import React from "react";
import { Card, Row, Col } from "antd";
import ProfileForm from "./ProfileForm";
import LoginForm from "./LoginForm";
import SettingsMenu from "./SettingsMenu";
import ProfileCard from "./ProfileCard";

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
    }

    return (
      <Row align="center">
        <Card>
          <Row align="center">
            <SettingsMenu
              selectedKey={[this.state.page]}
              onChange={this.onPageChange}
            />
          </Row>
          <Row>
            <Col align="center" xs={0} sm={8}>
              <ProfileCard />
            </Col>
            <Col xs={24} sm={16}>
              <Card title={<h2>{title}</h2>}> {form}</Card>
            </Col>
          </Row>
        </Card>
      </Row>
    );
  }
}

export default AccountSettings;
