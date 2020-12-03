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
  const [stage, setStage] = useState(false);
  const { userIsInstructor, course } = props;

  const _createCourse = async (newCourse) => {
    await props.createCourse(newCourse);
    if (userIsInstructor) {
      setStage("ADD_STUDENTS");
    }
  };
  const addedStudents = () => {
    setStage("CONFIRM");
  };

  const Page = () => {
    switch (stage) {
      case "ADD_STUDENTS":
        return (
          <AddStudents course_id={course._id} addedStudents={addedStudents} />
        );
      case "CONFIRM":
        return <Confirmation course={course} />;
      default:
        return <AddCourseInitial createCourse={_createCourse} />;
    }
  };

  return (
    <div className="add-course">
      <Page />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: selectors.getUserType(state),
    course: selectors.getCourse(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
};

const { createCourse } = actions;
export default connect(mapStateToProps, { createCourse })(AddCourse);
