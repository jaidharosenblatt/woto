import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import PageDetailMap from "./PageDetailMap";
import "./AdminContainer.css";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

/**
 * @jaidharosenblatt @tommytilton @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */
const AdminContainer = (props) => {
  const courses = props.courses;
  const pages = [];
  //move this into useEffect - dependency on courses, instead of props.courses
  //use context
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

  return (
    <Layout>
      <Layout.Sider width="220" breakpoint="lg" collapsedWidth="0">
        <AdminNavBar courses={courses} />
      </Layout.Sider>
      <Layout.Content>
        <div className="admin">
          <div className="admin-navbar-wrapper">
            <AvatarDropdown showName />
          </div>
          <div className="admin-body">
            <Switch>
              {pages}
              {props.routes}
              {props.redirects}
            </Switch>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

function mapStateToProps(state) {
  return { courses: selectors.getSortedCorses(state) };
}

export default connect(mapStateToProps)(AdminContainer);
