import React from "react";
import { Route, Link } from "react-router-dom";
import { Menu, Badge } from "antd";

export function mapCoursesToPages(map, courses) {
  const pages = [];
  courses.forEach((course) => {
    map.forEach((page) => {
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
            <Menu.Item key={`${course._id}/${page.path}`} title={page.title}>
              <Link to={`/${course._id}/${page.path}`}>
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
