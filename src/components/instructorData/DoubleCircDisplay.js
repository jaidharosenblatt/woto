import React from "react";
import { Row, Col } from "antd";
import CircDisplay from "../../components/instructorData/CircDisplay";

/**
 * @tommytilton Display stat cards based on student views
 */

const DoubleCircDisplay = (props) => {
  return (
    <Row >
      <Col xs={24} md={12}>
        <CircDisplay
          title={props.Circle1Data.title}
          units={props.Circle1Data.units}
          color={props.Circle1Data.color}
          min={props.Circle1Data.min}
          max={props.Circle1Data.max}
          avg={props.Circle1Data.avg}
        />
      </Col>
      <Col xs={24} md={12}>
        <CircDisplay
          title={props.Circle2Data.title}
          units={props.Circle2Data.units}
          color={props.Circle2Data.color}
          min={props.Circle2Data.min}
          max={props.Circle2Data.max}
          avg={props.Circle2Data.avg}
        />
      </Col>
    </Row>
  );
};

export default DoubleCircDisplay;
