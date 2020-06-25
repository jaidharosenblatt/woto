import React from "react";
import { Col } from "antd";
import HomeHeader from "../HomeHeader";

class ScheduleHelper extends React.Component {
  render() {
    return (
      <Col span={24}>
        <HomeHeader
          course={this.props.course.name}
          page={this.props.details.title}
          description={this.props.details.description}
        />
      </Col>
    );
  }
}

export default ScheduleHelper;
