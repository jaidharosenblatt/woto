import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col, Space } from "antd";
import "./NavBar.css";
import { Logo, LogoWhite } from "../../static/Images";
import AvatarDropdwon from "./AvatarDropdown";

/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 */
const SignedIn = ({ handleSelect, selected, menuItems }) => {
  return (
    <Row align="middle" style={{ height: "68px", backgroundColor: "#F4FBFF" }}>
      <Col span={4}>
        <Link to="/">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Col>
      <Col span={14} align="center">
        <Menu
          onSelect={(item) => {
            handleSelect(item.key);
          }}
          selectedKeys={[selected]}
          mode="horizontal"
        >
          {menuItems}
        </Menu>
      </Col>
      <Col span={6} align="right">
        <Space direction="vertical">
          <AvatarDropdwon showName />
        </Space>
      </Col>
    </Row>
  );
};

export default SignedIn;
