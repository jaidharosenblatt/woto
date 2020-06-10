import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col, Space } from "antd";
import "./NavBar.css";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import { Logo, Circle, Kaden } from "../../static/Images";
/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 * @param courses contains class name, page url, and whether or not the course has a TA active currently
 * @param user contains user Name and user profile picture,
 */

class NavBarSignedIn extends React.Component {
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
      return <img src={Circle} className="online" />;
    }
  };

  render() {
    return (
      <Row>
        <Col span={3}>
          <Link to="/">
            <img src={Logo} alt="logo" style={{ width: "75%" }} />{" "}
          </Link>
        </Col>
        <Col span={18}>
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
        </Col>
        <Col span={3}>
          <Space>
            {this.state.user.userName}
            <img
              src={Kaden}
              alt="profPic"
              style={{ width: "30px", height: "30px", borderRadius: "25px" }}
            />
          </Space>
        </Col>
      </Row>
    );
  }
}

export default NavBarSignedIn;
