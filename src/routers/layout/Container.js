import React from "react";
import { Switch } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";

import selectors from "../../redux/selectors";
import SideNavBar from "./SideNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import pageMapInstructors from "./pageMapInstructors";
import pageMapStudent from "./pageMapStudent";

import { mapCoursesToPages } from "./mapPages";
import "./container.css";

/**
 * @jaidharosenblatt @tommytilton @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */
const AdminContainer = (props) => {
  const courses = props.courses;

  const instructorPages = mapCoursesToPages(pageMapInstructors, courses);
  const studentPages = mapCoursesToPages(pageMapStudent, courses);

  return (
    <Layout>
      <Layout.Sider
        theme="light"
        width="220"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <SideNavBar />
      </Layout.Sider>
      <Layout.Content>
        <div className="admin">
          <div className="admin-navbar-wrapper">
            <AvatarDropdown showName />
          </div>
          <div className="admin-body">
            <Switch>
              {props.userIsInstructor ? instructorPages : studentPages}
            </Switch>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    courses: selectors.getSortedCourses(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
}

export default connect(mapStateToProps)(AdminContainer);
