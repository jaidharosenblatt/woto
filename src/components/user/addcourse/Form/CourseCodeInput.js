import React from "react";
import TextInputReq from "../../../form/TextInputReq";

const CourseCodeInput = () => {
  return (
    <TextInputReq
      label="Course Code"
      name="course code"
      placeholder="ABC123"
      message="Please enter a Course Code"
    />
  );
};

export default CourseCodeInput;
