import React from "react";
import { Row, Col } from "antd";

class ScheduleHelper extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col>Day of the Week</Col>
        </Row>
        <Row>
          <Col>Times of the Day</Col>
        </Row>
      </>
    );
  }
}

export default ScheduleHelper;
