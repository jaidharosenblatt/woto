import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Card, Row, Space } from "antd";
import ProfileForm from "./ProfileForm";
import InstructorProfileForm from "./instructorPages/InstructorProfileForm";
import LoginForm from "./LoginForm";
import SettingsMenu from "./SettingsMenu";
import ProfileCard from "./ProfileCard";
import "./AccountSettings.css";
import EditCourses from "./EditCourses";
import InstructorEditCourses from "./instructorPages/InstructorEditCourses";
import { AuthContext } from "../../contexts/AuthContext";
/*
  {state.userType === 'instructor'
        ? <ProfileForm dispatch={dispatch} user={state.user} />
        : <InstructorProfileForm onClick={this.handleLoginClick} />
      }
*/
const AccountSettings = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <Row align="center">
      <Card style={{ width: 700 }}>
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <Row align="center">
            <SettingsMenu />
          </Row>
          <Row>
            <ProfileCard user={state.user} />
          </Row>
          <Switch>
            <Route key="loginSettings" exact path="/accountsettings/login">
              <Card className="FullWidth" title={<h2>Login Information</h2>}>
                <LoginForm dispatch={dispatch} user={state.user} />
              </Card>
            </Route>
            <Route key="coursesSettings" path="/accountsettings/courses" exact>
              {state.userType === "instructor" ? (
                <InstructorEditCourses />
              ) : (
                <EditCourses />
              )}
            </Route>
            <Route key="profileSettings" exact path="/accountsettings/profile">
              <Card className="FullWidth" title={<h2>Your Profile</h2>}>
                {state.userType === "instructor" ? (
                  <InstructorProfileForm
                    dispatch={dispatch}
                    user={state.user}
                  />
                ) : (
                  <ProfileForm dispatch={dispatch} user={state.user} />
                )}
              </Card>
            </Route>
            <Redirect from="/accountsettings" to="/accountsettings/profile" />
          </Switch>
        </Space>
      </Card>
    </Row>
  );
};

export default AccountSettings;
