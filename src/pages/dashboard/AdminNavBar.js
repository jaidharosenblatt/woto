import React, { useState } from "react";
import { Menu, Badge } from "antd";
import { Link, useHistory } from "react-router-dom";

import { Logo } from "../../static/Images";
import "./Home.css";
import AdminPageDetailMap from "./PageDetailMap";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import { changeCourse } from "../../redux/current-course/actionCreators";

const { SubMenu } = Menu;

/**
 * Dynamically render a navbar from an array of courses by mapping
 * each course to page from AdminPageDetailMap
 * @param courses array of courses to render in
 */
const AdminNavBar = (props) => {
  const path = window.location.pathname.substr(1).split("/");
  const courseKey = path[0];
  const page = path[1];
  const history = useHistory();
  const [openKeys, setOpenKeys] = useState([courseKey]);

  //remove students not helped
  let pages = [...AdminPageDetailMap];
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].path === "nothelped") {
      pages.pop(pages[i]);
    }
  }

  const handleTitleClick = async (courseId) => {
    await props.changeCourse(courseId);
    //if already in selected keys then remove it
    if (openKeys.includes(courseId)) {
      setOpenKeys([...openKeys.filter((key) => key !== courseId)]);
    }
    //if not in selected keys then open it and go to at a glance
    else {
      setOpenKeys([...openKeys, courseId]);
      history.push(`/${courseId}/${AdminPageDetailMap[0].path}`);
    }
  };

  return (
    <Menu
      style={{ height: "100%", width: "100%", overflow: "scroll" }}
      mode="inline"
      defaultSelectedKeys={[`${courseKey}/${page}`]}
      openKeys={openKeys}
    >
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="WotoLogo" />
        </Link>
      </div>

      {props.courses.map((course) => {
        return (
          <SubMenu
            onTitleClick={() => handleTitleClick(course._id)}
            key={course._id}
            title={
              course.activeSession ? (
                <Badge style={{ marginTop: 10 }} status="success">
                  {course.code}
                </Badge>
              ) : (
                course.code
              )
            }
          >
            {pages.map((page) => {
              return (
                <Menu.Item
                  key={`${course._id}/${page.path}`}
                  title={page.title}
                >
                  <Link to={`/${course._id}/${page.path}`}>
                    {page.icon}
                    {page.title}
                  </Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      })}
      <Menu.Item key="addcourse" title="Add Course">
        <Link to="/addcourse">Add a New Course</Link>
      </Menu.Item>
    </Menu>
  );
};

function mapStateToProps(state) {
  return { courses: selectors.getSortedCourses(state) };
}

export default connect(mapStateToProps, { changeCourse })(AdminNavBar);
