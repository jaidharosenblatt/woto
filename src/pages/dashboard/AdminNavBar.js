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

/**@kadenrosenblatt prints out the navbar with links and event handlers attached to each menu item
 * @prop onClick a callback function which updates AdminContainer's state to reflect the current coursename and dashboard page
 */

class AdminNavBar extends React.Component {
  render() {
    const courses = this.props.courses;
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
            <SubMenu key={course._id} title={course.code}>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={`${course._id}"At a Glance"`}
                title="At a Glance"
              >
                <Link to={`/admin/${course._id}/ataglance`}>
                  <BarChartOutlined />
                  At a Glance
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={`${course._id}Schedule Helper`}
                title="Schedule Helper"
              >
                <Link to={`/admin/${course._id}/schedulehelper`}>
                  <CalendarOutlined />
                  Schedule Helper
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={`${course._id} Specific Session`}
                title="Specific Session"
              >
                <Link to={`/admin/${course._id}/specificsession`}>
                  <ZoomInOutlined />
                  Specific Session
                </Link>
              </Menu.Item>
              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={`${course.name}Roster`}
                title="Roster"
              >
                <Link to={`/admin/${course._id}/roster`}>
                  <UserOutlined />
                  Roster
                </Link>
              </Menu.Item>

              <Menu.Item
                onClick={(e) => this.props.onClick(e, course.name)}
                key={`${course.name}Course Settings`}
                title="Course Settings"
              >
                <Link to={`/admin/${course._id}/coursesettings`}>
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
