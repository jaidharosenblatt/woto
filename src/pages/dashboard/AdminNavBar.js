import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Logo } from "../../static/Images";
import { SolutionOutlined } from "@ant-design/icons";
import "./Home.css";
import AdminPageDetailMap from "./PageDetailMap";

const { SubMenu } = Menu;

/**@kadenrosenblatt prints out the navbar with links and event handlers attached to each menu item
 * @prop onClick a callback function which updates AdminContainer's state to reflect the current coursename and dashboard page
 */

class AdminNavBar extends React.Component {
  render() {
    const path = window.location.pathname.substr(1).split("/");
    const courseKey = path[1];
    const page = path[2];

    //remove students not helped
    let pages = [...AdminPageDetailMap];
    pages.pop();

    const courses = this.props.courses;
    return (
      <Menu
        style={{ height: "100%", width: "100%" }}
        mode="inline"
        defaultSelectedKeys={[`${courseKey}/${page}`]}
        defaultOpenKeys={[courseKey]}
      >
        <div>
          <Link to="/admin">
            <img src={Logo} alt="logo" className="WotoLogo" />
          </Link>
        </div>
        {courses.map((course) => {
          return (
            <SubMenu key={course._id} title={course.code}>
              {pages.map((page) => {
                return (
                  <Menu.Item
                    onClick={(e) => this.props.onClick(e, course.name)}
                    key={`${course._id}/${page.path}`}
                    title={page.title}
                  >
                    <Link to={`/admin/${course._id}/${page.path}`}>
                      {page.icon}
                      {page.title}
                    </Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    );
  }
}
export default AdminNavBar;
