import React, { useContext } from "react";
import { Row, Col, Space } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import StudentAddCourse from "./Form/StudentAddCourse";
import InstructorAddCourse from "./Form/InstructorAddCourse";

import "./addcourse.css";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @MatthewSclar Page for students to add courses.
 * uses: AddCourseForm component
 */

const AddCourse = () => {
  const context = useContext(AuthContext);
  const userType = context.state.userType;
  return (
    <Row className="AddCourse">
      <Col xs={0} md={10}>
        <div className="ImageCard" />
      </Col>
      <Col xs={24} md={14}>
        <div className="FormWrapper">
          <div className="AddCourseForm">
            <Space align="center" direction="vertical">
              <Link to="/">
                <img className="WotoLogo" src={Logo} alt="Woto Logo" />
              </Link>
              <h2 className="header">Join a new course</h2>
              {userType === "instrucotr" ? (
                <InstructorAddCourse />
              ) : (
                <StudentAddCourse />
              )}
            </Space>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AddCourse;
