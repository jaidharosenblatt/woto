import React from "react";
import { Space } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import StudentInput from "./Form/StudentInput";
import "./addcourse.css";

/**
 * @MatthewSclar
 * This is the second stage for the create course workflow for instructors
 *
 */

const AddStudents = ({ course_id, addedStudents }) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Link to="/">
        <Logo className="WotoLogo" />
      </Link>
      <StudentInput course_id={course_id} addedStudents={addedStudents} />
    </Space>
  );
};

export default AddStudents;
