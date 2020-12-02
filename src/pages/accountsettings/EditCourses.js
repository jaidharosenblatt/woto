import React from "react";
import { List, Button } from "antd";
import { Link } from "react-router-dom";
import "./AccountSettings.css";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import UnenrollButton from "../../components/buttons/UnenrollButton";

import EmptyState from "./EmptyState";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import actions from "../../redux/sorted-courses/actionCreators";

/**
 * @jaidharosenblatt temporary class for showing 3 TA items
 */
const EditCourses = (props) => {
  const { courses } = props;

  const courseList =
    courses.length > 0 ? (
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
            <UnenrollButton
              handleUnenroll={(newCourse) => props.courseUnenroll(newCourse)}
              course={course}
            />
          </List.Item>
        )}
      />
    ) : (
      <EmptyState message="Add courses to see them appear here" />
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

const mapStateToProps = (state) => {
  return { courses: selectors.getSortedCourses(state) };
};

const { courseUnenroll } = actions;

export default connect(mapStateToProps, { courseUnenroll })(EditCourses);
