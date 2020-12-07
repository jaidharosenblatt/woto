import React from "react";
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
  const [page, setPage] = React.useState("session");
  const history = useHistory();

  function handleItemClick(item) {
    console.log(item);
    setPage(item);
  }
  const handleTitleClick = async (id) => {
    await props.changeCourse(id);
    history.push(`/courses/${id}`);
  };

  const studentMenu = mapCoursesToMenuItems(
    pageMapStudent,
    props.courses,
    handleTitleClick,
    handleItemClick
  );
  const instructorMenu = mapCoursesToMenuItems(
    pageMapInstructors,
    props.courses,
    handleTitleClick,
    handleItemClick
  );

  return (
    <Menu
      style={{ overflow: "scroll", height: "100vh" }}
      mode="inline"
      selectedKeys={[`/courses/${props.courseID}/${page}`]}
      defaultOpenKeys={[props.courseID]}
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
