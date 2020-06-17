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
        <Link to="/instructor">
          <img src={Logo} alt="logo" className="WotoLogo" />
        </Link>
        {courses.map((course) => {
          return (
            <SubMenu key={course.name} title={course.name}>
              <Menu.Item key={`ataglance ${course.name}`}>
                <Link to={`/instructor/${course.name}/ataglance`}>
                  <BarChartOutlined />
                  At a Glance
                </Link>
              </Menu.Item>
              <Menu.Item key={`schedule ${course.name}`}>
                <Link to={`/instructor/${course.name}/schedule`}>
                  <CalendarOutlined />
                  Schedule Helper{" "}
                </Link>{" "}
              </Menu.Item>
              <Menu.Item key={`specific ${course.name}`}>
                <Link to={`/instructor/${course.name}/specific`}>
                  <ZoomInOutlined />
                  Specific Session
                </Link>
              </Menu.Item>
              <Menu.Item key={`roster ${course.name}`}>
                <Link to={`/instructor/${course.name}/roster`}>
                  <UserOutlined />
                  Roster
                </Link>
              </Menu.Item>

              <Menu.Item key={`settings ${course.name}`}>
                <Link to={`/instructor/${course.name}/settings`}>
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
