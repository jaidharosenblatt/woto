import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Layout } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./NavBar.css";
import AvatarDropdown from "./AvatarDropdown";

const { Content, Sider } = Layout;

/**
 * @jaidharosenblatt Mobile view for navbar that has hamburger icon
 * @param menuItems array of MenuItems that represent the
 * active user's courses (and links to their respective pages)
 */
class Mobile extends React.Component {
  constructor() {
    super();
    this.state = { openMenu: true };
  }

  handleMenuClick = () => {
    this.setState({ openMenu: !this.state.openMenu });
  };

  render() {
    return (
      <Layout style={{ backgroundColor: "#40A9FF" }}>
        <Sider width={50} align="center">
          <Dropdown
            overlay={
              <Menu style={{ width: "100vw", marginTop: "12px" }}>
                {this.props.menuItems}
              </Menu>
            }
            onClick={this.handleMenuClick}
            trigger={["click"]}
          >
            {this.state.openMenu ? (
              <MenuOutlined className="MenuIcon" />
            ) : (
              <CloseOutlined className="MenuIcon" />
            )}
          </Dropdown>
        </Sider>
        <Content align="center">
          <Link to="/help">
            <img src={LogoWhite} alt="logo" className="Logo" />
          </Link>
        </Content>
        <Sider width={50}>
          <AvatarDropdown />
        </Sider>
      </Layout>
    );
  }
}

export default Mobile;
