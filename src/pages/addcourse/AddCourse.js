import React from "react";
import { Row, Col } from "antd";

import AddCourseForm from "./Form/AddCourseForm";

<<<<<<< HEAD
import "./addcourse.css";

=======
>>>>>>> 2bc71d4ad03fec15df1f943d3b089d7b23e05200
/**
 * @MatthewSclar Page for students to sign up.
 */

const AddCourse = () => {
  return (
    <div className="Page">
<<<<<<< HEAD
      <Row align="middle">
        <Col md={0} lg={10}>
          <div className="ImageCard" align="center" />
        </Col>
        <Col xs={24} lg={14} align="center">
          <div className="Form">
            <AddCourseForm style={{ display: "inlineBlock" }} />
          </div>
        </Col>
      </Row>
=======
      <AddCourseForm />
>>>>>>> 2bc71d4ad03fec15df1f943d3b089d7b23e05200
    </div>
  );
};

export default AddCourse;
