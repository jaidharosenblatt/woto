import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";
import PageNotFound from "../../pages/errors/PageNotFound";

import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import PageDetailMap from "./PageDetailMap";
import "./AdminContainer.css";

/**
 * @jaidharosenblatt and @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */
const AdminContainer = (props) => {
  console.log(props.redirects);
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

  const styles = {
    adminNavbar: {
      zIndex: 3,
      height: "100vw",
      backgroundColor: "rgb(247, 247, 247)",
      padding: "0px",
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
      <Layout.Sider
        width="220"
        style={styles.adminNavbar}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setScreenSizeSmall(collapsed);
        }}
      >
        <AdminNavBar courses={courses} />
      </Layout.Sider>

      <Layout>
        <div
          className="admin-navbar-wrapper"
          style={{
            width: screenSizeSmall ? "100%" : "calc(100vw - 220px)",
          }}
        >
          <AvatarDropdown showName />
        </div>
        <div className="AdminBody" style={{ padding: 24 }}>
          <Switch>
            {pages}
            {courses.length > 0 ? (
              <Route
                path={["/", "/signin", "/signup"]}
                exact
                component={() => {
                  return <Redirect to={`/${courses[0]._id}/officehours`} />;
                }}
              />
            ) : (
              <Route
                path={["/", "/signin", "/signup"]}
                exact
                component={() => {
                  return <Redirect to={"/addcourse"} />;
                }}
              />
            )}
            {props.routes}

            <Route component={PageNotFound} />

            {/* {props.courses[0] && (
              <Redirect exact from="/" to={`/${courses[0]._id}/officehours`} />
            )} */}
          </Switch>
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminContainer;
