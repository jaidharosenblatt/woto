import React from "react";
import TAInfo from "./TAInfo";
import ChartDisplay from "../../ChartComponent/ChartDisplay";
import { Col } from "antd";
import HomeHeader from "../../HomeHeader";

/**
 * Show overall stats for a given class
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
class AtAGlance extends React.Component {
  render() {
    return (
      <Col span={24}>
        <HomeHeader
          course={this.props.course.name}
          page={this.props.details.title}
          description={this.props.details.description}
        />
        <TAInfo />
        <ChartDisplay />
      </Col>
    );
  }
}

export default AtAGlance;
