import React from "react";
import { Row, Col } from "antd";

import AddCourseForm from "./Form/AddCourseForm";

/**
 * @MatthewSclar Page for students to sign up.
 */

const AddCourse = () => {
  return (
    <div className="Page">
      <AddCourseForm />
    </div>
  );
};

export default AddCourse;
