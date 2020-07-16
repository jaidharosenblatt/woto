import React, { useEffect, useState } from "react";
import { Card, List, Button } from "antd";
import { Link } from "react-router-dom";
import "./AccountSettings.css";
import UnenrollButton from "../../components/buttons/UnenrollButton";
import API from "../../api/API";

const CoursesTitle = () => {
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
const EditCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function getCourses() {
      const res = await API.getCourses();
      console.log(res);
      setCourses(res);
    }
    getCourses();
  }, []);

  return (
    <Card className="FullWidth" title={<CoursesTitle />}>
      <List
        itemLayout="horizontal"
        dataSource={courses}
        renderItem={(course) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={course._id}>
                  {course.code} ({course.role})
                </Link>
              }
              description={<h3>{course.name}</h3>}
            />
            <UnenrollButton course={course} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EditCourses;
