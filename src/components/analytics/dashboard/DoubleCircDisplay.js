import React from "react";
import { Row, Col } from "antd";
import CircDisplay from "./CircDisplay";

/**
 * @tommytilton Display stat cards based on student views
 */

const DoubleCircDisplay = ({ home = {} }) => {
  return (
    <Row>
      <Col xs={24} sm={12}>
        <CircDisplay
          title="Interaction Length"
          units="minutes"
          color="#1890FF"
          min={home.interactionLength?.["25p"]}
          max={home.interactionLength?.["75p"]}
          avg={home.interactionLength?.average}
        />
      </Col>
      <Col xs={24} sm={12}>
        <CircDisplay
          title="Wait Time"
          units="minutes"
          color="#eb5757"
          min={home.interactionLength?.["25p"]}
          max={home.interactionLength?.["75p"]}
          avg={home.waitTime?.average}
        />
      </Col>
    </Row>
  );
};

export default DoubleCircDisplay;
