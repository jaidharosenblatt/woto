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

const { Header, Content, Sider, Footer } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/accountsettings">
        <SettingOutlined /> Account Settings
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/login">
        <LogoutOutlined /> Log out
      </Link>
    </Menu.Item>
  </Menu>
);

class NavBarSignedInXs extends React.Component {
  state = {
    current: "CS330",
    courses: [
      { class: "CS330", page: "/penis", hasActiveUser: true },
      { class: "CS250", page: "/poopy", hasActiveUser: false },
      { class: "CS101", page: "/imlostlmao", hasActiveUser: false },
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
      return <img src={Circle} className="Online" />;
    }
  };

  //   render() {
  //     return (
  //       <Layout>
  //         <Sider
  //           breakpoint="xs"
  //           collapsedWidth="0"
  //           onBreakpoint={(broken) => {
  //             console.log(broken);
  //           }}
  //           onCollapse={(collapsed, type) => {
  //             console.log(collapsed, type);
  //           }}
  //         >
  //           <div className="logo" />
  //           <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
  //             <Menu.Item key="1">nav 1</Menu.Item>
  //             <Menu.Item key="2">nav 2</Menu.Item>
  //             <Menu.Item key="3">nav 3</Menu.Item>
  //             <Menu.Item key="4">nav 4</Menu.Item>
  //           </Menu>
  //         </Sider>
  //       </Layout>
  render() {
    return (
      <Layout>
        <Sider breakpoint="xs" collapsedWidth="0px">
          <Link to="/help">
            <img src={Logo} alt="logo" className="Logo" />
          </Link>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="vertical"
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
        </Sider>
        <Content />
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

export default NavBarSignedInXs;
