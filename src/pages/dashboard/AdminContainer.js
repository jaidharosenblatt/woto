import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import PageDetailMap from "./PageDetailMap";
import "./AdminContainer.css";

/**
 * @jaidharosenblatt and @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */
const AdminContainer = (props) => {
  const [screenSizeSmall, setScreenSizeSmall] = useState(false);
  const courses = props.courses;
  const pages = [];
  courses.forEach((course) => {
    PageDetailMap.forEach((page) => {
      const Page = page.page;
      pages.push(
        <Route
          exact
          key={`/${course._id}/${page.path}`}
          path={`/${course._id}/${page.path}`}
          component={() => {
            return <Page course={course} details={page} />;
          }}
        />
      );
    });
  });

  // const styles = {
  //   adminNavbar: {
  //     zIndex: 3,
  //     position: "fixed",
  //     height: "100vh",
  //     backgroundColor: "rgb(247, 247, 247)",
  //     padding: "0px",
  //   },

  //   layoutStyles: {
  //     backgroundColor: "rgb(247, 247, 247)",
  //   },
  //   contentStyles: {
  //     backgroundColor: "rgb(247, 247, 247)",
  //     margin: "24px 12px 0",
  //   },
  // };

  return (
    <Layout>
      <Layout.Sider
        width={220}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setScreenSizeSmall(collapsed);
        }}
      >
        <AdminNavBar courses={courses} />
      </Layout.Sider>
      <Layout.Content>
        <Layout>
          <Layout.Header>
            <AvatarDropdown showName />
          </Layout.Header>
          {/* <div
            className="admin-navbar-wrapper"
            style={{
              width: screenSizeSmall ? "100%" : "calc(100vw - 220px)",
            }}
          >
            
          </div> */}
          <div className="AdminBody" style={{ padding: 24 }}>
            <Switch>
              {pages}
              {props.routes}
              {props.redirects}
            </Switch>
          </div>
        </Layout>
      </Layout.Content>
    </Layout>
  );
};

export default AdminContainer;
