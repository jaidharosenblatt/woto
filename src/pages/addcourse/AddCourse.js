import React, { useState } from "react";
import { Col, Row } from "antd";
import AddCourseInitial from "./AddCourseInitial";
import AddStudents from "./AddStudents";
import Confirmation from "./Confirmation";
import "./addcourse.css";
import selectors from "../../redux/selectors";
import actions from "../../redux/sorted-courses/actionCreators";

import { connect } from "react-redux";

/**
 * @MatthewSclar
 * This is the main page for the entire addcourse workflow for students and teachers
 */

const AddCourse = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { userType, course } = props;

  const _createCourse = async (newCourse) => {
    await props.createCourse(newCourse);
  };
  const addedStudents = () => {
    setShowConfirmation(true);
  };

  let page;
  if (course) {
    if (showConfirmation) {
      page = <Confirmation course={course} />;
    } else {
      page = (
        <AddStudents course_id={course._id} addedStudents={addedStudents} />
      );
    }
  } else {
    page = <AddCourseInitial createCourse={_createCourse} />;
  }

  return (
    <>
      {userType === "instructor" ? (
        <div className="add-course">{page}</div>
      ) : (
        <Row style={{ width: "100%", height: "100%" }}>
          <Col xs={0} md={10}>
            <div className="ImageCard" />
          </Col>
          <Col xs={24} md={14}>
            <div className="add-course-wrapper">
              <div className="add-course">{page}</div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: selectors.getUserType(state),
    course: selectors.getCourse(state),
  };
};

const { createCourse } = actions;
export default connect(mapStateToProps, { createCourse })(AddCourse);
