import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import PageDetailMap from "./PageDetailMap";
import "./AdminContainer.css";
import StudentsNotHelped from "../dashboard/pages/adminAtGlance/StudentsNotHelped";

const { Sider, Header, Content } = Layout;

/**
 * @jaidharosenblatt and @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */

const courses = {
  cs330: { name: "CS330", institution: "duke", userType: "admin" },
  cs250: { name: "CS250", institution: "duke", userType: "admin" },
  cs101: { name: "CS101", institution: "duke", userType: "admin" },
};

const courseKeys = Object.keys(courses);
const pageKeys = Object.keys(PageDetailMap);
/*
  pages.push(
    <Route
      exact
      key={`${courseKeys[i]}/studentsNotHelped}`}
      path="/admin/${courseKeys[i]}/studentsNotHelped"
      component={StudentsNotHelped}
    />
  );
*/
const pages = [];
for (let i = 0; i < courseKeys.length; i++) {

  for (let j = 0; j < pageKeys.length; j++) {
    let Page = PageDetailMap[pageKeys[j]].page;
    pages.push(
      <Route
        exact
        key={`${courseKeys[i]}/${pageKeys[j]}`}
        path={`/admin/${courseKeys[i]}/${pageKeys[j]}`}
        component={() => {
          return (
            <Page
              course={courses[courseKeys[i]]}
              details={PageDetailMap[pageKeys[j]]}
            />
          );
        }}
      />
    );
  }
}

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
              {pages}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminContainer;
