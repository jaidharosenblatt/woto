import React, { useState } from "react";
import AddCourseInitial from "./AddCourseInitial";
import AddStudents from "./AddStudents";
import Confirmation from "./Confirmation";
import "./addcourse.css";
import selectors from "../../../redux/selectors";
import { createCourse } from "../../../redux/sorted-courses/actionCreators";

import { connect } from "react-redux";
import PageCard from "../../util-components/centeredpage/PageCard";

/**
 * @MatthewSclar
 * This is the main page for the entire add course workflow for students and teachers
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
        return <AddStudents addedStudents={addedStudents} />;
      case "CONFIRM":
        return <Confirmation course={course} />;
      default:
        return <AddCourseInitial createCourse={_createCourse} />;
    }
  };

  return (
    <div className="add-course">
      <PageCard navbar>
        <Page />
      </PageCard>
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

export default connect(mapStateToProps, { createCourse })(AddCourse);
