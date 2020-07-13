import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";

import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import PageDetailMap from "./PageDetailMap";
import "./AdminContainer.css";

const { Sider, Header, Content } = Layout;

/**
 * @jaidharosenblatt and @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */
class AdminContainer extends React.Component {
  state = {
    courseName: "CS330",
    dashPage: "At a Glance",
    screenSizeSmall: false,
  };

  onClick = (e, course) => {
    this.setState({ courseName: course, dashPage: e.item.props.title });
  };

  render() {
    const courses = this.props.courses;
    const pages = [];
    courses.forEach((course) => {
      PageDetailMap.forEach((page) => {
        const Page = page.page;
        console.log(course._id, page.path);
        pages.push(
          <Route
            exact
            key={`${course._id}/${page.path}`}
            path={`/admin/${course._id}/${page.path}`}
            component={() => {
              return <Page course={course} details={page} />;
            }}
          />
        );
      });
    });

    const styles = {
      adminNavbar: {
        zIndex: 1,
        height: "100vw",
        backgroundColor: "rgb(247, 247, 247)",
        padding: "0px",
      },
      adminProfileBar: {
        position: "fixed",
        zIndex: 1,
        height: "68px",
        width: this.state.screenSizeSmall ? "100%" : "calc(100vw - 220px)",
        //width: "calc(100vw - 220px)",
        backgroundColor: "rgb(247, 247, 247)",
        padding: "0px",
        paddingRight: "8px",
      },
      layoutStyles: {
        backgroundColor: "rgb(247, 247, 247)",
      },
      contentStyles: {
        backgroundColor: "rgb(247, 247, 247)",
        margin: "24px 12px 0",
      },
    };

    return (
      <Layout style={styles.layoutStyles}>
        <Sider
          width="220"
          style={styles.adminNavbar}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            //this.setState({ screenSizeSmall: broken });
          }}
          onCollapse={(collapsed, type) => {
            this.setState({ screenSizeSmall: collapsed });
          }}
        >
          <AdminNavBar courses={courses} onClick={this.onClick} />
        </Sider>

        <Layout>
          <Header align="right" style={styles.adminProfileBar}>
            <AvatarDropdown showName />
          </Header>
          <Content style={styles.contentStyles}>
            <div className="AdminBody" style={{ padding: 24 }}>
              <Switch>
                {pages}
                <Redirect exact from="/admin" to="admin/CS330/ataglance" />;
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminContainer;
