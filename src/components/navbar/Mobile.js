import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu, Dropdown, Layout } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./NavBar.css";
import AvatarDropdown from "./AvatarDropdown";

const { Content, Sider } = Layout;

const styles = {
  page: { backgroundColor: "#40A9FF", height: "68px" },
  menu: {
    width: "100vw",
    marginTop: "16px",
    overflow: "scroll",
    maxHeight: 300,
  },
  logo: { width: "100px" },
};

/**
 * @jaidharosenblatt Mobile view for navbar that has hamburger icon
 * @param menuItems array of MenuItems that represent the
 * @param handleSelect change selected menu item
 * @param selected currently selected page
 * active user's courses (and links to their respective pages)
 * Manually redirects as quick fix for inconsistent onChange
 */
const Mobile = ({ menuItems, handleSelect, selected }) => {
  const [openMenu, setOpenMenu] = useState(true);
  const [redirect, setRedirect] = useState();

  const handleClick = () => setOpenMenu(!openMenu);

  const handlePageChange = (item) => {
    setOpenMenu(!openMenu);
    handleSelect(item.key);
    setRedirect(item.key);
  };

  return (
    <Layout style={styles.page}>
      {redirect && <Redirect to={redirect} />}
      <Sider width={80} align="left">
        <Dropdown
          overlay={
            <Menu
              onClick={handlePageChange}
              selectedKeys={[selected]}
              style={styles.menu}
            >
              {menuItems}
            </Menu>
          }
          onVisibleChange={handleClick}
          trigger={["click"]}
        >
          {openMenu ? (
            <MenuOutlined className="MenuIcon" />
          ) : (
            <CloseOutlined className="MenuIcon" />
          )}
        </Dropdown>
      </Sider>
      <Content align="center">
        <Link to="/">
          <img src={LogoWhite} alt="logo" style={styles.logo} />
        </Link>
      </Content>
      <Sider width={80} align="right">
        <AvatarDropdown />
      </Sider>
    </Layout>
  );
};

export default Mobile;
