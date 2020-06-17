import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Layout } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./NavBar.css";
import AvatarDropdown from "./AvatarDropdown";

const { Content, Sider } = Layout;

const styles = {
  page: { backgroundColor: "#40A9FF", height: "68px" },
  menu: { width: "100vw", marginTop: "18px" },
  logo: { width: "100px" },
};

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
      <Layout style={styles.page}>
        <Sider align="left">
          <Dropdown
            overlay={<Menu style={styles.menu}>{this.props.menuItems}</Menu>}
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
          <Link to="/">
            <img src={LogoWhite} alt="logo" style={styles.logo} />
          </Link>
        </Content>
        <Sider align="right">
          <AvatarDropdown />
        </Sider>
      </Layout>
    );
  }
}

export default Mobile;
