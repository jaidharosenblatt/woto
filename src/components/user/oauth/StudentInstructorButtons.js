import { Col, Row } from "antd";
import React from "react";
import DukeAuthButton from "./DukeAuthButton";

/**
 * Two buttons with spaced row for student and instructor sign in/sign up with Oauth
 */
export default function StudentInstructorButtons() {
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} md={12}>
        <DukeAuthButton userType="student" text="Duke Student" />
      </Col>
      <Col xs={24} md={12}>
        <DukeAuthButton userType="instructor" text="Duke Instructor" />
      </Col>
    </Row>
  );
}
