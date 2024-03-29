import React from "react";
import { Col, Button } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import "./addcourse.css";
/**
 * This is the final stage for the create course workflow for instructors
 */

const Confirmation = ({ course }) => {
  return (
    <Col align="center" span={24} style={{ maxWidth: 500, margin: "auto" }}>
      <Link to="/">
        <Logo className="WotoLogo" />
      </Link>
      <h2 style={{ paddingBottom: "10px", paddingTop: "10px" }}>
        {`Your course, ${course.name} (${course.code}) has been created!`}
      </h2>
      <Link to={`/courses/${course && course._id}/session`}>
        <Button block type="primary">
          Let's Get Started!
        </Button>
      </Link>
    </Col>
  );
};

export default Confirmation;
