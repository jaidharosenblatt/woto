import React from "react";
import { List, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./AccountSettings.css";
import UnenrollButton from "../../modals/buttons/UnenrollButton";

import EmptyState from "./EmptyState";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { courseUnenroll } from "../../../redux/sorted-courses/actionCreators";

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
      <Row>
        <Col span={12}>
          <h2>Courses</h2>
        </Col>
        <Col span={12} align="right">
          <Link to="/addcourse">
            <Button type="primary">Add New Course</Button>
          </Link>
        </Col>
      </Row>
      {courseList}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { courses: selectors.getSortedCourses(state) };
};

export default connect(mapStateToProps, { courseUnenroll })(EditCourses);
