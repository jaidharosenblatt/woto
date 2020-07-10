import React, { useState } from "react";
import {Link } from "react-router-dom";
import InstructorAddCourse from "./InstructorAddCourse";
import InstructorJoinCourse from "./InstructorJoinCourse";



const InstructorForm = ({createCourse}) => {
  const [page, setPage] = useState(true);

  const changeForm = () => {
    setPage(!page);
}
  return (
    <>
    {page ? ( <>
      <InstructorAddCourse createCourse = {createCourse}/>
      <p style={{position:"relative", left:"16px", bottom:"25px"}}> Want to join an existing course?
        <a type="link" onClick={changeForm} > Click here! </a>
      </p> </>
    ) : (  <>
      <InstructorJoinCourse />
      <p style={{position:"relative", left:"23px", bottom:"25px"}}> Want to create a new course?
        <a type="link" onClick={changeForm} > Click here! </a>
      </p> </>)
     }
    </>
  );
}

export default InstructorForm
