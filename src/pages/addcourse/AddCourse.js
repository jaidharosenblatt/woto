import React from "react";
import { Row, Col } from "antd";

import AddCourseForm from "./Form/AddCourseForm";
import "./addcourse.css";

/**
 * @MatthewSclar Page for students to add courses.
 * uses: AddCourseForm component
 */

const AddCourse = ({ newUser }) => {
  return (
    <Row className="AddCourse">
      <Col xs={0} md={10}>
        <div className="ImageCard" />
      </Col>
      <Col xs={24} md={14}>
        <div className="FormWrapper">
          <AddCourseForm newUser={newUser} />
        </div>
      </Col>
    </Row>
  );
};

export default AddCourse;
