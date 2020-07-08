import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./NavBar.css";
import { Logo, LogoWhite } from "../../static/Images";
import AvatarDropdwon from "./AvatarDropdown";

/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 */
const { Content, Sider } = Layout;
const styles = {
  normal: { height: "68px", backgroundColor: "#F4FBFF" },
  blue: { height: "68px", backgroundColor: "#40A9FF" },
  menu: {
    background: "none",
    borderBottom: "0px",
    height: "52px",
    lineHeight: "46px",
  },
};
const SignedIn = ({ handleSelect, selected, menuItems, whiteMenuItems }) => {
  const blue = selected === "addcourse";
  return (
    <Layout style={blue ? styles.blue : styles.normal}>
      <Sider>
        <Link to="/">
          <img src={blue ? LogoWhite : Logo} alt="logo" className="Logo" />
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
            {blue ? whiteMenuItems : menuItems}
          </Menu>
        </div>
      </Content>
      <Sider align="right">
        <AvatarDropdwon showName white={blue} />
      </Sider>
    </Layout>
  );
};

export default SignedIn;
