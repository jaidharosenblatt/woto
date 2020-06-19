import React from "react";
import { Card, List, Button } from "antd";
import { Link } from "react-router-dom";

import "./AccountSettings.css";

const staff = [
  {
    code: "CS 330",
    name: "Design and Analysis of Algorithms",
    path: "/cs330",
  },
  {
    code: "CS 250",
    name: "Computer Architecture",
    path: "/cs250",
  },
];

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const EditCourses = ({ title, button, active }) => {
  return (
    <Card className="FullWidth" title={<h2>{title}</h2>}>
      <List
        itemLayout="horizontal"
        dataSource={staff}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                active ? (
                  <Link to={item.path}>{item.code}</Link>
                ) : (
                  <p>{item.code}</p>
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
