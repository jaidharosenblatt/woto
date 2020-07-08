import React from "react";
import { Menu, Row, Badge } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

//Renders a green button if the course is active
const MenuText = ({ course }) => {
  if (course.activeSession) {
    return (
      <Link to={`/${course._id}`}>
        <Badge status="success">
          <p style={{ color: "#595959" }}> {course.code}</p>
        </Badge>
      </Link>
    );
  }
  return (
    <Link to={`/${course._id}`}>
      <p style={{ color: "#595959" }}> {course.code}</p>
    </Link>
  );
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
  console.log("CALLEDDD");

  const items = [];
  courses.forEach((course) =>
    items.push(
      <Menu.Item key={course._id} className="menu-items">
        <Row>
          <MenuText course={course} />
        </Row>
      </Menu.Item>
    )
  );

  //sorting for consistent ordering

  if (courses.length > 0) {
    items.push(
      <Menu.Item key="add">
        <Link to="/addcourse">Add course</Link>
      </Menu.Item>
    );
  }

  return [items];
};

export default MenuItems;
