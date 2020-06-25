import React from "react";
import { Menu, Row, Badge } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

// Temporary courses TODO replace with network call
const courses = [
  { name: "CS330", page: "/duke/cs330", active: true },
  { name: "CS250", page: "/duke/cs250", active: false },
  { name: "CS101", page: "/duke/cs101/open", active: false },
];

//Renders a green button if the course is active
const MenuText = (props) => {
  if (props.course.active) {
    return (
      <Link to={props.course.page}>
        <Badge status="success">{props.course.name}</Badge>
      </Link>
    );
  }
  return <Link to={props.course.page}>{props.course.name}</Link>;
};

/**
 * @jaidharosenblatt creates an array of Menu Items
 * that correspond to user's active courses
 * @param {courses} name of course
 * @param {courses} page URL to course
 * @param {courses} active whether or not course has active session
 */
const MenuItems = [];
courses.forEach((course) =>
  MenuItems.push(
    <Menu.Item key={course.name} className="menu-items">
      <Row>
        <MenuText course={course} />
      </Row>
    </Menu.Item>
  )
);

MenuItems.push(
  <Menu.Item key="add">
    <Link to="/addcourse">Add course</Link>
  </Menu.Item>
);

export default MenuItems;
