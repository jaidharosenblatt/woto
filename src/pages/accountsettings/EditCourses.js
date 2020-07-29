import React, { useEffect, useState, useContext } from "react";
import { Card, List, Button } from "antd";
import { Link } from "react-router-dom";
import "./AccountSettings.css";
import UnenrollButton from "../../components/buttons/UnenrollButton";
import API from "../../api/API";
import { CoursesContext } from "../../contexts/CoursesContext";

const CoursesTitle = () => {
  return (
    <div style={{ clear: "both" }}>
      <h2 style={{ float: "left" }}>Courses</h2>
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
  const { courses, setCourses } = useContext(CoursesContext);

  const handleUnenroll = async (course) => {
    console.log(course);
    const unenrollId = course._id;
    const res = await API.unenroll(unenrollId);
    const filteredCourses = courses.filter(
      (course) => course._id !== unenrollId
    );
    setCourses([...filteredCourses]);
    console.log(res);
  };

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
                  {course.code} {course.role && `(${course.role})`}
                </Link>
              }
              description={<h3>{course.name}</h3>}
            />
            <UnenrollButton handleUnenroll={handleUnenroll} course={course} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EditCourses;
