import React, { useContext } from "react";
import { Menu, Row, Badge } from "antd";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./NavBar.css";

//Renders a green button if the course is active
const MenuText = ({ course }) => {
  return (
    <NavLink to={`/${course._id}`}>
      {course.activeSession ? (
        <Badge status="success">
          <p>{course.code}</p>
        </Badge>
      ) : (
        <p> {course.code}</p>
      )}
    </NavLink>
  );
};

/**
 * @jaidharosenblatt creates an array of Menu Items
 * that correspond to user's active courses
 * @param {courses} code of course
 * @param {courses} _id URL to course
 * @param {courses} activeSession whether or not course has active session
 */
const MenuItems = (courses) => {
  const { state } = useContext(AuthContext);
  const items = [];
  const admin = (
    <Menu.Item key="admin" className="menu-items">
      <NavLink to="/admin">
        <p>Admin</p>
      </NavLink>
    </Menu.Item>
  );
  const addCourse = (
    <Menu.Item key="addcourse" className="menu-items">
      <NavLink to="/addcourse">
        <p>Add course</p>
      </NavLink>
    </Menu.Item>
  );

  if (courses != null) {
    courses.forEach((course) =>
      items.push(
        <Menu.Item key={course._id} className="menu-items">
          <Row>
            <MenuText course={course} />
          </Row>
        </Menu.Item>
      )
    );

    if (courses.length > 0) {
      items.push(addCourse);
    }
  }
  if (state.userType === "instructor") return [admin, addCourse];
  return [items];
};

export default MenuItems;
