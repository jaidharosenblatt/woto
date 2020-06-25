import React from "react";
import TAInfo from "./TAInfo";
import ChartDisplay from "../../ChartComponent/ChartDisplay";
import { Col } from "antd";
import HomeHeader from "../../HomeHeader";

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
