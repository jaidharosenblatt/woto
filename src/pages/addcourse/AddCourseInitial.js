import React, { useContext } from "react";
import { Row, Col, Space } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import StudentAddCourse from "./Form/StudentAddCourse";
import InstructorForm from "./Form/InstructorForm";

import "./addcourse.css";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @MatthewSclar
 * This is the intial stage for the Add course workflow for students and instructors
 *
 */

const AddCourse = ({ createCourse }) => {
  const context = useContext(AuthContext);
  const userType = context.state.userType;

  return (
    <Space align="center" direction="vertical" style={{ width: "100%" }}>
      <Link to="/">
        <img className="WotoLogo" src={Logo} alt="Woto Logo" />
      </Link>
      {userType === "instructor" ? (
        <div>
          <InstructorForm createCourse={createCourse} />
        </div>
      ) : (
        <StudentAddCourse />
      )}
    </Space>
  );
};

export default AddCourse;
