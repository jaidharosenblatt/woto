import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { Menu, Badge } from "antd";

export function mapCoursesToPages(map, courses) {
  const pages = [];
  courses.forEach((course) => {
    map.forEach((page) => {
      const Page = page.page;
      pages.push(
        <Route
          exact
          key={`/courses/${course._id}/${page.path}`}
          path={`/courses/${course._id}/${page.path}`}
          render={() => {
            return <Page course={course} details={page} />;
          }}
        />
      );
    });
    pages.push(
      <Route
        key={`/courses/${course._id}`}
        path={[`/courses/${course._id}`, `/courses/${course._id}/`]}
        render={() => {
          console.log("redirect ", course._id);
          console.log(`/courses/${course._id}/session`);
          return <Redirect to={`/courses/${course._id}/session`} />;
        }}
      />
    );
  });
  return pages;
}

export function mapCoursesToMenuItems(map, courses, handleTitleClick) {
  return courses.map((course) => {
    return (
      <Menu.SubMenu
        onTitleClick={() => handleTitleClick(course._id)}
        key={course._id}
        title={
          course.activeSession ? (
            <Badge style={{ marginTop: 10 }} status="success">
              {course.code}
            </Badge>
          ) : (
            course.code
          )
        }
      >
        {map.map((page) => {
          return (
            <Menu.Item
              key={`/courses/${course._id}/${page.path}`}
              title={page.title}
            >
              <Link to={`/courses/${course._id}/${page.path}`}>
                {page.icon}
                {page.title}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu.SubMenu>
    );
  });
}
