import React, { useState, useContext } from "react";
import { Col, Row } from "antd";
import AddCourseInitial from "./AddCourseInitial";
import AddStudents from "./AddStudents";
import Confirmation from "./Confirmation";
import "./addcourse.css";
import { AuthContext } from "../../contexts/AuthContext";
import { CoursesContext } from "../../contexts/CoursesContext";

/**
 * @MatthewSclar
 * This is the main page for the entire addcourse workflow for students and teachers
 *
 */

const AddCourse = () => {
  const { state } = useContext(AuthContext);
  const [stage, setStage] = useState();
  const [course, setCourse] = useState();
  const { courses, setCourses } = useContext(CoursesContext);

  const createCourse = (values) => {
    console.log("we created a course:", values);
    setCourse(values);
    setCourses([...courses, values]);

    setStage("ADDSTUDENTS");
  };

  const addedStudents = () => {
    setStage("CONFIRMATION");
  };

  var page = null;
  switch (stage) {
    case "ADDSTUDENTS":
      page = (
        <AddStudents course_id={course._id} addedStudents={addedStudents} />
      );
      break;
    case "CONFIRMATION":
      page = <Confirmation course={course} />;
      break;
    default:
      page = <AddCourseInitial createCourse={createCourse} />;
      break;
  }

  return (
    <>
      {state.userType === "instructor" ? (
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
export default AddCourse;
