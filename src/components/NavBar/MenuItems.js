import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Circle } from "../../static/Images";
import { PlusCircleOutlined } from "@ant-design/icons";

const courses = [
  { class: "CS330", page: "/cs330", active: true },
  { class: "CS250", page: "/cs250", active: false },
  { class: "CS101", page: "/cs101", active: false },
];

const renderActiveButton = (hasActiveUser) => {
  if (hasActiveUser) {
    return <img src={Circle} alt="active" className="Online" />;
  }
};

export const MenuItems = [];
courses.forEach((course) =>
  MenuItems.push(
    <Menu.Item key={course.class}>
      <Link to={course.page}>{course.class}</Link>
      {renderActiveButton(course.hasActiveUser)}
    </Menu.Item>
  )
);

MenuItems.push(
  <Menu.Item key="add">
    <Link to="/addnewcourse">
      <PlusCircleOutlined />
    </Link>
  </Menu.Item>
);
