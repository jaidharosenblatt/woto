import React from "react";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";
import NavBarMobile from "./NavBarMobile";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Circle } from "../../static/Images";
import { Kaden } from "../../static/Images";

import { PlusCircleOutlined } from "@ant-design/icons";
import "./NavBar.css";
import { Col, Layout } from "antd";

const { Header } = Layout;

const courses = [
  { class: "CS330", page: "/cs330", active: true },
  { class: "CS250", page: "/cs250", active: false },
  { class: "CS101", page: "/cs101", active: false },
];

const user = {
  name: "Kaden",
  profilePic: Kaden,
};

let current = "CS330";

const handleClick = (e) => {
  current = e.key;
};

const renderActiveButton = (hasActiveUser) => {
  if (hasActiveUser) {
    return <img src={Circle} alt="active" className="Online" />;
  }
};

const menuItems = [];
courses.forEach((course) =>
  menuItems.push(
    <Menu.Item key={course.class}>
      <Link to={course.page}>{course.class}</Link>
      {renderActiveButton(course.hasActiveUser)}
    </Menu.Item>
  )
);

menuItems.push(
  <Menu.Item key="add">
    <Link to="/addnewcourse">
      <PlusCircleOutlined />
    </Link>
  </Menu.Item>
);

const NavBarDecider = ({ signedIn }) => {
  if (signedIn) {
    return (
      <div>
        <Col xs={24} md={0}>
          <NavBarMobile courses={menuItems} user={user} />
        </Col>
        <Col xs={0} md={24}>
          <NavBarSignedIn
            user={user}
            handleClick={handleClick}
            current={current}
            courses={menuItems}
          />
        </Col>
      </div>
    );
  } else {
    return <NavBarNotSignedIn />;
  }
};

const NavBar = ({ signedIn }) => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 2,
        padding: 0,
        width: "100%",
        backgroundColor: "#F4FBFF",
      }}
    >
      <NavBarDecider signedIn={signedIn} />
    </Header>
  );
};

export default NavBar;
