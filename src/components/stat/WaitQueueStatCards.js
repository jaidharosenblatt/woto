import React from "react";
import { Row, Col } from "antd";

import Stat from "./Stat";
import { QueueImage, ClockImageBlue } from "../../static/Images";

/**
 * @jaidharosenblatt Display stat cards based on student views
 */
const WaitQueueStatCards = ({ inQueue }) => {
  return (
    <Row>
      <Col span={12}>
        <Stat
          title={inQueue ? "Your Spot" : "Queue"}
          value={inQueue ? "2/10" : "10"}
          footer="students"
          alt="people"
          image={QueueImage}
        />
      </Col>
      <Col span={12}>
        <Stat
          title="Wait Time"
          value={25}
          alt="clock"
          footer="minutes"
          image={ClockImageBlue}
        />
      </Col>
    </Row>
  );
};

export default WaitQueueStatCards;
