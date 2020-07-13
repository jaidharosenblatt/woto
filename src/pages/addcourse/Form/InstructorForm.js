import React, { useState } from "react";
import {Button, Row} from "antd"
import InstructorAddCourse from "./InstructorAddCourse";
import InstructorJoinCourse from "./InstructorJoinCourse";
import "../addcourse.css";


const InstructorForm = ({createCourse}) => {
  const [page, setPage] = useState(true);

  const changeForm = () => {
    setPage(!page);
}
  return (
    <>
    {page ? ( <>
      <InstructorAddCourse createCourse = {createCourse}/>
        <Row>
          <p className="InstructorForm" style={{position:"relative", left:"16px", bottom:"25px"}}> Want to join an existing course?
              <Button type="link" onClick={changeForm}  > Click here! </Button>

          </p>
        </Row>
      </>
    ) : (  <>
      <InstructorJoinCourse />
        <Row>
          <p className="InstructorForm"  style={{position:"relative", left:"23px", bottom:"25px"}}> Want to create a new course?   
              <Button type="link" onClick={changeForm}  > Click here! </Button>
          </p>
        </Row>
      </>)
     }
    </>
  );
}

export default InstructorForm
