import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./NavBar.css";
import { Logo } from "../../static/Images";
import AvatarDropdwon from "./AvatarDropdown";

/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 */
const { Content, Sider } = Layout;
const styles = {
  normal: { height: "68px", backgroundColor: "#F4FBFF" },
  addcourse: { height: "68px", background: "none" },
  menu: {
    background: "none",
    borderBottom: "0px",
    height: "52px",
    lineHeight: "46px",
  },
};
const SignedIn = ({ handleSelect, selected, menuItems }) => {
  return (
    <Layout style={styles.normal}>
      <Sider>
        <Link to="/">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content align="center">
        <div className="CenterLeftContainer">
          <Menu
            onSelect={(item) => {
              handleSelect(item.key);
            }}
            style={styles.menu}
            selectedKeys={[selected]}
            mode="horizontal"
          >
            {menuItems}
          </Menu>
        </div>
      </Content>
      <Sider align="right">
        <AvatarDropdwon showName />
      </Sider>
    </Layout>
  );
};

export default SignedIn;
