import React, { useContext } from "react";
import { Row, Col, Space, Input } from "antd";
import { Logo } from "../../../static/Images";
import { Link } from "react-router-dom";


import "../addcourse.css";


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
          <div className="AddCourseForm">
            <Space align="center" direction="vertical">
              <Link to="/">
                <img className="WotoLogo" src={Logo} alt="Woto Logo" />
              </Link>

              <h2> Add Students to Liven up your Course.</h2>

              <h2> Need assistance? Add TA's </h2>




            </Space>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AddStudents;
