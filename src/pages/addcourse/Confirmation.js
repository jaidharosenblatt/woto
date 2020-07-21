import React from "react";
import { Col, Button } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import "./addcourse.css";

/**
 * @MatthewSclar
 * This is the final stage for the create course workflow for instructors
 *
 */

const Confirmation = ({ course }) => {
  return (
    <Col align="center" span={24}>
      <Link to="/">
        <img className="WotoLogo" src={Logo} alt="Woto Logo" />
      </Link>
      <h2 style={{ paddingBottom: "10px", paddingTop: "10px" }}>
        {`Your course, ${course.name} (${course.code}) has been created!`}
      </h2>
      <Link to={`/${course._id}/session`}>
        <Button onClick={() => window.location.reload()} block type="primary">
          Let's Get Started!
        </Button>
      </Link>
    </Col>
  );
};

export default Confirmation;
