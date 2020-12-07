import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";

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
  const path = window.location.pathname.substr(1).split("/");
  const history = useHistory();
  const [page, setPage] = useState(path[2] || "session");

  const handleTitleClick = async (id) => {
    await props.changeCourse(id);
    history.push(`/courses/${id}/${page}`);
  };

  const handleClick = (event) => {
    const newPath = event.key.substr(1).split("/");
    setPage(newPath[2]);
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
      onSelect={handleClick}
      style={{ overflow: "scroll", height: "100vh" }}
      mode="inline"
      selectedKeys={[`/courses/${props.courseID}/${page}`]}
      openKeys={[props.courseID]}
    >
      <div>
        <Link to="/">
          <Logo className="WotoLogo" />
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
