import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import "./NavBar.css";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import { Logo } from "../../static/Images";
import { Circle } from "../../static/Images";
/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param isSignedIn whether user is signed in or not
 * @param current The current course the student has selected
 * @param courses contains class name, page url, and whether or not the course has a TA active currently
 */

class NavBar extends React.Component {
  state = {
    isSignedIn: false,
    current: "CS330",
    courses: [
      { class: "CS330", page: "/help", hasActiveUser: true },
      { class: "Sign In", page: "/signin", hasActiveUser: false },
      { class: "Sign Up", page: "/signup", hasActiveUser: false },
    ],
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
            <img src={Logo} style={{ width: "75%" }} />{" "}
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
              <Link to="/addcourse">
                <PlusCircleOutlined />
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3}>
          <UserOutlined />
        </Col>
      </Row>
    );
  }
}

export default NavBar;
