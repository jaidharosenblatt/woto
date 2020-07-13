import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu, Dropdown, Row, Col } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./NavBar.css";
import AvatarDropdown from "./AvatarDropdown";

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
    <Row align="middle" style={styles.page}>
      {redirect && <Redirect to={redirect} />}
      <Col span={6}>
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
          <div className="mobile-hamburger">
            {openMenu ? (
              <MenuOutlined className="MenuIcon" />
            ) : (
              <CloseOutlined className="MenuIcon" />
            )}
          </div>
        </Dropdown>
      </Col>
      <Col span={12} align="center">
        <Link to="/">
          <img src={LogoWhite} alt="logo" style={styles.logo} />
        </Link>
      </Col>
      <Col span={6} align="right">
        <AvatarDropdown />
      </Col>
    </Row>
  );
};

export default Mobile;
