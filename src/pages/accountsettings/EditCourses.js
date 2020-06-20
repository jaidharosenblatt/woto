import React from "react";
import { Card, List, Button } from "antd";
import { Link } from "react-router-dom";
import "./AccountSettings.css";

const staff = [
  {
    code: "CS 330",
    name: "Design and Analysis of Algorithms",
    role: "Student",
    path: "/cs330",
  },
  {
    code: "CS 250",
    name: "Computer Architecture",
    role: "Teaching Assistant",
    path: "/cs250",
  },
];

const CoursesTitle = ({ active }) => {
  if (!active) return <h2>Inactive Courses</h2>;
  return (
    <div style={{ clear: "both" }}>
      <h2 style={{ float: "left" }}>Active Courses</h2>
      <Link to="/addcourse">
        <Button type="primary" style={{ float: "right" }}>
          Add New Course
        </Button>
      </Link>
    </div>
  );
};

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const EditCourses = ({ button, active }) => {
  return (
    <Card className="FullWidth" title={<CoursesTitle active={active} />}>
      <List
        itemLayout="horizontal"
        dataSource={staff}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                active ? (
                  <Link to={item.path}>
                    {item.code} ({item.role})
                  </Link>
                ) : (
                  <p>
                    {item.code} ({item.role})
                  </p>
                )
              }
              description={<h3>{item.name}</h3>}
            />
            {active ? <Button> {button}</Button> : null}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EditCourses;
