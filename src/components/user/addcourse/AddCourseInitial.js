import React from "react";
import { Space } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import StudentAddCourse from "./Form/StudentAddCourse";
import InstructorForm from "./Form/InstructorForm";

import "./addcourse.css";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";

/**
 * @MatthewSclar
 * This is the intial stage for the Add course workflow for students and instructors
 */
const AddCourse = (props) => {
  return (
    <Space align="center" direction="vertical" style={{ width: "100%" }}>
      <Link to="/">
        <Logo className="WotoLogo" />
      </Link>
      {props.userIsInstructor ? (
        <InstructorForm createCourse={props.createCourse} />
      ) : (
        <StudentAddCourse createCourse={props.createCourse} />
      )}
    </Space>
  );
};
const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    userIsInstructor: selectors.userIsInstructor(state),
  };
};
export default connect(mapStateToProps)(AddCourse);
