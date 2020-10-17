import React, { useContext } from "react";
import { List, Button } from "antd";
import { Link } from "react-router-dom";
import "./AccountSettings.css";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import UnenrollButton from "../../components/buttons/UnenrollButton";
import API from "../../api/API";
import { CoursesContext } from "../../contexts/CoursesContext";
import EmptyState from "./EmptyState";

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

  const courseList = ( courses.length > 0 ?
      (
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
      ) : (
        <EmptyState message="Add courses to see them appear here" />
      )
  );

  return (
    <div>
      <LeftRightRow
        left={<h2>Courses</h2>}
        right={
          <Link to="/addcourse">
            <Button type="primary" style={{ float: "right" }}>
              Add New Course
            </Button>
          </Link>
        }
      />
      {courseList}
    </div>
  );
};

export default EditCourses;
