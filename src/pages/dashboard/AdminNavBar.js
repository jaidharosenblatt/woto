import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  BarChartOutlined,
  CalendarOutlined,
  ZoomInOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Logo } from "../../static/Images";
import "./Home.css";

const { SubMenu } = Menu;
const courses = [
  { name: "CS330", page: "/cs330" },
  { name: "CS250", page: "/cs250" },
  { name: "CS101", page: "/cs101" },
];

class AdminNavBar extends React.Component {
  render() {
    return (
      <Menu
        style={{ height: "100%", width: "100%" }}
        mode="inline"
        defaultSelectedKeys={["CS330"]}
        defaultOpenKeys={["CS330"]}
      >
        <div>
          <Link to="/admin">
            <img src={Logo} alt="logo" className="WotoLogo" />
          </Link>
        </div>

        {courses.map((course) => {
          return (
            <SubMenu key={course.name} title={course.name}>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={"At a Glance"}
              >
                <Link to={`/admin/${course.name}/ataglance`}>
                  <BarChartOutlined />
                  At a Glance
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={"Schedule Helper"}
              >
                <Link to={`/admin/${course.name}/schedule`}>
                  <CalendarOutlined />
                  Schedule Helper
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={"Specific Session"}
              >
                <Link to={`/admin/${course.name}/specific`}>
                  <ZoomInOutlined />
                  Specific Session
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={"Roster"}
              >
                <Link to={`/admin/${course.name}/roster`}>
                  <UserOutlined />
                  Roster
                </Link>
              </Menu.Item>

              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={`Course Settings`}
              >
                <Link to={`/admin/${course.name}/settings`}>
                  <SettingOutlined />
                  Course Settings
                </Link>
              </Menu.Item>
            </SubMenu>
          );
        })}
      </Menu>
    );
  }
}
export default AdminNavBar;
