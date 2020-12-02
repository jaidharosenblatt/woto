import React from "react";
import { Space } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import StudentAddCourse from "./Form/StudentAddCourse";
import InstructorForm from "./Form/InstructorForm";

import "./addcourse.css";
import { connect } from "react-redux";
import selectors from "../../redux/auth/selectors";

/**
 * @MatthewSclar
 * This is the intial stage for the Add course workflow for students and instructors
 */
const AddCourse = (props) => {
  const { userType } = props;

  return (
    <Space align="center" direction="vertical" style={{ width: "100%" }}>
      <Link to="/">
        <img className="WotoLogo" src={Logo} alt="Woto Logo" />
      </Link>
      {userType === "instructor" ? (
        <div>
          <InstructorForm createCourse={props.createCourse} />
        </div>
      ) : (
        <StudentAddCourse createCourse={props.createCourse} />
      )}
    </Space>
  );
};
const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    userType: selectors.getUserType(state),
  };
};
export default connect(mapStateToProps)(AddCourse);
