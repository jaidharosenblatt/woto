import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Space, Dropdown } from "antd";
import "./NavBar.css";
import {
  PlusCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import { Logo, Circle, Kaden } from "../../static/Images";
/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 * @param courses contains class name, page url, and whether or not the course has a TA active currently
 * @param user contains user Name and user profile picture,
 */

const { Content, Sider } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/accountsettings">
        <SettingOutlined /> Account Settings
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/signin">
        <LogoutOutlined /> Log out
      </Link>
    </Menu.Item>
  </Menu>
);

class NavBarSignedIn extends React.Component {
  state = {
    current: "CS330",
    courses: [
      { class: "CS330", page: "/cs330", hasActiveUser: true },
      { class: "CS250", page: "/cs250", hasActiveUser: false },
      { class: "CS101", page: "/cs101", hasActiveUser: false },
    ],
    user: { userName: "Kaden Rosenblatt", profilePic: "UserOutlined" },
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  renderActiveButton = (hasActiveUser) => {
    if (hasActiveUser) {
      return <img src={Circle} alt="active" className="Online" />;
    }
  };
  render() {
    return (
      <Layout>
        <Sider>
          <Link to="/help">
            <img src={Logo} alt="logo" className="Logo" />
          </Link>
        </Sider>
        <Content>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            {this.state.courses.map((item) => {
              return (
                <MenuItem key={item.class}>
                  <Link to={item.page}>{item.class}</Link>
                  {this.renderActiveButton(item.hasActiveUser)}
                </MenuItem>
              );
            })}
            <Menu.Item key="add">
              <Link to="/addnewcourse">
                <PlusCircleOutlined />
              </Link>
            </Menu.Item>
          </Menu>
        </Content>
        <Sider className="Profile">
          <Dropdown overlay={menu} trigger={["click"]}>
            <div>
              <Link
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <img src={Kaden} alt="profPic" className="profPic" />
                  {this.state.user.userName}{" "}
                </Space>
              </Link>
            </div>
          </Dropdown>
        </Sider>
      </Layout>
    );
  }
}

export default NavBarSignedIn;
