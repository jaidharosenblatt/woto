import React, { useState } from "react";
import AddCourseInitial from "./AddCourseInitial";
import AddStudents from "./AddStudents";

/**
 * @MatthewSclar
 * This is the main page for the entire addcourse workflow for students and teachers
 *
 */

const AddCourse = () => {
  const [stage, setStage] = useState("ADDSTUDENTS");
  const [course, setCourse] = useState();


  const createCourse = (values) =>{
    setStage("ADDSTUDENTS");
    console.log("we created a course");
  }

  var page = null;
  switch (stage) {
    case "ADDSTUDENTS":
      page = <AddStudents />;
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
