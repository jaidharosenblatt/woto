import React from "react";
import { Row, Col, Space } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import StudentInput from "./Form/StudentInput";
import "./addcourse.css";




/**
 * @MatthewSclar
 * This is the second stage for the create course workflow for instructors
 *
 */

const AddStudents = () => {

  return (
    <Row className="AddCourse">
      <Col xs={0} md={10}>
        <div className="ImageCard" />
      </Col>
      <Col xs={24} md={14}>
        <div className="FormWrapper">
          <div className="AddCourseForm" style={{width:"50%"}}>
            <Space direction="vertical" style={{width:"100%"}}>
              <Link to="/">
                <img className="WotoLogo" src={Logo} alt="Woto Logo" />
              </Link>
                <StudentInput />
            </Space>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AddStudents;
