import React, {useContext} from "react";
import { Menu, Row, Badge } from "antd";
import { NavLink } from "react-router-dom";
import {CoursesContext} from "../../contexts/CoursesContext";
import "./NavBar.css";

//Renders a green button if the course is active
const MenuText = ({ course, white }) => {
  return (
    <NavLink to={`/${course._id}`} className={white ? "white" : "normal"}>
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
const MenuItems = (white) => {
  const {courses} = useContext(CoursesContext);
  const items = [];

  courses.forEach((course) =>
    items.push(
      <Menu.Item key={course._id} className="menu-items">
        <Row>
          <MenuText white={white} course={course} />
        </Row>
      </Menu.Item>
    )
  );

  if (courses.length > 0) {
    items.push(
      <Menu.Item key="addcourse" className="menu-items">
        <NavLink to="/addcourse" className={white ? "white" : "normal"}>
          <p>Add course</p>
        </NavLink>
      </Menu.Item>
    );
  }

  return [items];
};

export default MenuItems;
