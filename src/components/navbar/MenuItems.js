import React from "react";
import { Menu, Row, Badge } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

//Renders a green button if the course is active
const MenuText = (props) => {
  if (props.course.active) {
    return (
      <Link to={props.course._id}>
        <Badge status="success">{props.course.code}</Badge>
      </Link>
    );
  }
  return <Link to={props.course._id}>{props.course.code}</Link>;
};

/**
 * @jaidharosenblatt creates an array of Menu Items
 * that correspond to user's active courses
 * @param {courses} name of course
 * @param {courses} page URL to course
 * @param {courses} active whether or not course has active session
 */
const MenuItems = (courses = []) => {
  console.log(courses);
  const items = [];
  courses.forEach((course) =>
    items.push(
      <Menu.Item key={course.name} className="menu-items">
        <Row>
          <MenuText course={course} />
        </Row>
      </Menu.Item>
    )
  );

  items.push(
    <Menu.Item key="add">
      <Link to="/addcourse">Add course</Link>
    </Menu.Item>
  );

  return [items];
};

export default MenuItems;
