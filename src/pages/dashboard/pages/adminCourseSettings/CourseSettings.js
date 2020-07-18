import React from "react";
import { Row, Col } from "antd";
import HomeHeader from "../../HomeHeader";
import CourseSettingsForm from "./form/CourseSettingsForm";
import CustomizeQuestion from "./form/CustomizeQuestion"
/**
 * Allows admin to change course specific settings
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
const CourseSettings = (props) => {
  return (
    <Col span={24}>
      <Row>
        <Col span={24}>
          <HomeHeader
            course={props.course.name}
            page={props.details.title}
            description={props.details.description}
          />
        </Col>
      </Row>
      <Row >
        <CourseSettingsForm />
      </Row>
      <br/>
      <Row >
        <CustomizeQuestion />
      </Row>
    </Col>
  );
};

export default CourseSettings;
