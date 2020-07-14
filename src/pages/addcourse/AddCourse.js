import React, { useState } from "react";
import AddCourseInitial from "./AddCourseInitial";
import AddStudents from "./AddStudents";
import Confirmation from "./Confirmation";

/**
 * @MatthewSclar
 * This is the main page for the entire addcourse workflow for students and teachers
 *
 */

const AddCourse = () => {
  const [stage, setStage] = useState("");
  const [course_id, setCourse_id] = useState();

  const createCourse = (values) =>{
    console.log("we created a course:", values);
    setCourse_id(values._id);
    setStage("ADDSTUDENTS");
  }

  const addedStudents = () => {
    setStage("CONFIRMATION");
  }

  var page = null;
  switch (stage) {
    case "ADDSTUDENTS":
      page = <AddStudents course_id ={course_id} addedStudents={addedStudents}  />;
      break;
    case "CONFIRMATION":
      page = <Confirmation />
      break;
    default:
        page = <AddCourseInitial createCourse={createCourse} />;
        break;
    }

  return(
    <>
      {page}
    </>);
}
export default AddCourse;
