import React, { useState } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";

import { MenuOutlined } from "@ant-design/icons";
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
  const [showNav, setShowNav] = useState(false);
  const courses = props.courses;

  const instructorPages = mapCoursesToPages(pageMapInstructors, courses);
  const studentPages = mapCoursesToPages(pageMapStudent, courses);

  return (
    <div>
      <div
        className="mobile-navbar-wrapper"
        style={{ width: showNav ? "260px" : "0px" }}
      >
        <SideNavBar />

        <div
          className="collapse-controller"
          onClick={() => setShowNav(!showNav)}
        >
          <MenuOutlined />
        </div>
      </div>

      <div className="desktop-navbar-wrapper">
        <SideNavBar />
      </div>

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
    </div>
  );
};

function mapStateToProps(state) {
  return {
    courses: selectors.getSortedCourses(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
}

export default connect(mapStateToProps)(AdminContainer);
