import React from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";

import { Logo } from "../../static/Images";
import "./container.css";
import pageMapStudent from "./pageMapStudent";
import pageMapInstructors from "./pageMapInstructors";

import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import { changeCourse } from "../../redux/current-course/actionCreators";
import { mapCoursesToMenuItems } from "./mapPages";

/**
 * Dynamically render a navbar from an array of courses by mapping
 * each course to page from AdminPageDetailMap
 * @param courses array of courses to render in
 */
const SideNavBar = (props) => {
  const path = window.location.pathname.substr(1).split("/");
  const page = path[1];
  const history = useHistory();

  const handleTitleClick = async (id) => {
    await props.changeCourse(id);
    history.push(`/${id}/session`);
  };

  const studentMenu = mapCoursesToMenuItems(
    pageMapStudent,
    props.courses,
    handleTitleClick
  );
  const instructorMenu = mapCoursesToMenuItems(
    pageMapInstructors,
    props.courses,
    handleTitleClick
  );

  return (
    <Menu
      style={{ overflow: "scroll", height: "100vh" }}
      mode="inline"
      defaultSelectedKeys={[`${props.courseID}/${page}`]}
      openKeys={[props.courseID]}
    >
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="WotoLogo" />
        </Link>
      </div>
      {props.userIsInstructor ? instructorMenu : studentMenu}

      <Menu.Item key="addcourse" title="Add Course">
        <Link to="/addcourse">Add a New Course</Link>
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
