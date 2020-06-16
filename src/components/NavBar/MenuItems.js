import React from "react";
import { Menu, Row } from "antd";
import { Link } from "react-router-dom";
import { Circle } from "../../static/Images";
import { PlusCircleOutlined } from "@ant-design/icons";

// Temporary courses TODO replace with network call
const courses = [
  { name: "CS330", page: "/cs330", active: true },
  { name: "CS250", page: "/cs250", active: false },
  { name: "TA", page: "/opensession-ta", active: false },
];

//Renders a green button if the course is active
const renderActiveButton = (hasActiveUser) => {
  if (hasActiveUser) {
    return <img src={Circle} alt="active" className="Online" />;
  }
};

/**
 * @jaidharosenblatt creates an array of Menu Items
 * that correspond to user's active courses
 * @param {courses} name of course
 * @param {courses} page URL to course
 * @param {courses} active whether or not course has active session
 */
export const MenuItems = [];
courses.forEach((course) =>
  MenuItems.push(
    <Menu.Item key={course.name}>
      <Row>
        <Link to={course.page} style={{ color: "#595959" }}>
          {course.name}
        </Link>
        {renderActiveButton(course.active)}
      </Row>
    </Menu.Item>
  )
);

MenuItems.push(
  <Menu.Item key="add">
    <Link to="/addcourse">
      <PlusCircleOutlined />
    </Link>
  </Menu.Item>
);
