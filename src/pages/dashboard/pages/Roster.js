import React from "react";
import { Col } from "antd";
import HomeHeader from "../HomeHeader";

/**
 * Allows admin to modify roster
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
const Roster = (props) => {
  return (
    <Col span={24}>
      <HomeHeader
        course={props.course.name}
        page={props.details.title}
        description={props.details.description}
      />
    </Col>
  );
};

export default Roster;
