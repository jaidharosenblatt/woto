import React from "react";
import { Menu } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Logo } from "../../../static/LoadedImages";
import pageMapStudent from "../signed-in-content/pageMapStudent";
import pageMapInstructors from "../signed-in-content/pageMapInstructors";

import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { changeCourse } from "../../../redux/current-course/actionCreators";
import { mapCoursesToMenuItems } from "../signed-in-content/mapPages";

/**
 * Dynamically render a navbar from an array of courses by mapping
 * each course to page from pageMapInstructors or pageMapStudent
 * @param courses array of courses to render in
 */
const SideNavBar = (props) => {
  const history = useHistory();
  const location = useLocation();

  const handleTitleClick = async (id) => {
    await props.changeCourse(id);
    history.push(`/courses/${id}/session`);
  };

  const studentMenu = mapCoursesToMenuItems(pageMapStudent, props.courses, handleTitleClick);
  const instructorMenu = mapCoursesToMenuItems(pageMapInstructors, props.courses, handleTitleClick);

  return (
    <Menu
      style={{ overflow: "scroll", height: "100vh" }}
      mode="inline"
      openKeys={[props.courseID]}
      selectedKeys={[location.pathname]}
    >
      <div>
        <Link to="/">
          <Logo className="WotoLogo" />
        </Link>
      </div>
      {props.userIsInstructor ? instructorMenu : studentMenu}

      <Menu.Item key="addcourse" title="Add Course">
        <Link to="/addcourse">{props.userIsInstructor ? "Create" : "Join"} a New Course</Link>
      </Menu.Item>
    </Menu>
  );
};

function mapStateToProps(state) {
  return {
    courses: selectors.getSortedCourses(state),
    courseID: selectors.getCourseID(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
}

export default connect(mapStateToProps, { changeCourse })(SideNavBar);
