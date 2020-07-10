import React, { useState } from "react";
import API from "../../api/API";
import AddCourseInitial from "./AddCourseInitial";

/**
 * @MatthewSclar
 * This is the main page for the entire addcourse workflow for students and teachers
 *
 */



const AddCourse = () => {
  const [stage, setStage] = useState();
  const [course, setCourse] = useState();

  const createCourse = async (values) =>{
    setStage("ADDSTUDENTS")
  }

  const joinCourse = async (values) =>{
  
  }

  var page = null;
  switch (stage) {
    case "ADDSTUDENTS":
      page = <> </>;
      break;
    default:
        page = <AddCourseInitial/>;
      break;
    }

  return(
    <>
      {page}
    </>);
}
export default AddCourse;
