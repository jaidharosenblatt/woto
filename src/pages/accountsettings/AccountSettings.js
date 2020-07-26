import React, { useContext, useState } from "react";
import { Card, Row, Space } from "antd";
import ProfileForm from "./ProfileForm";
import LoginForm from "./LoginForm";
import SettingsMenu from "./SettingsMenu";
import ProfileCard from "./ProfileCard";
import "./AccountSettings.css";
import EditCourses from "./EditCourses";
import { AuthContext } from "../../contexts/AuthContext";

const AccountSettings = () => {
  const [page, setPage] = useState("profile");
  const { state, dispatch } = useContext(AuthContext);

  const onPageChange = (e) => {
    setPage(e.key);
  };

  let form = (
    <Card className="FullWidth" title={<h2>Your Profile</h2>}>
      <ProfileForm dispatch={dispatch} user={state.user} />
    </Card>
  );

  if (page === "login") {
    form = (
      <Card className="FullWidth" title={<h2>Login Information</h2>}>
        <LoginForm dispatch={dispatch} user={state.user} />
      </Card>
    );
  }
  if (page === "courses") {
    form = (
      <Space className="FullWidth" direction="vertical" align="middle">
        <EditCourses />
      </Space>
    );
  }

  return (
    <Row align="center">
      <Card style={{ width: 700 }}>
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <Row align="center">
            <SettingsMenu selectedKey={[page]} onChange={onPageChange} />
          </Row>
          <Row>
            <ProfileCard user={state.user} />
          </Row>
          <Row>{form}</Row>
        </Space>
      </Card>
    </Row>
  );
};

export default AccountSettings;
