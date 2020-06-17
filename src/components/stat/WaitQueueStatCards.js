import React from "react";
import { Row, Col } from "antd";

import Stat from "./Stat";
import { QueueImage, ClockImageBlue } from "../../static/Images";

/**
 * @jaidharosenblatt Display stat cards based on student views
 */
const WaitQueueStatCards = () => {
  return (
    <Row>
      <Col span={12}>
        <Stat
          title="Wait Time"
          value={25}
          alt="clock"
          footer="minutes"
          image={ClockImageBlue}
        />
      </Col>
      <Col span={12}>
        <Stat
          title="Queue"
          value={10}
          footer="students"
          alt="people"
          image={QueueImage}
        />
      </Col>
    </Row>
  );
};

export default WaitQueueStatCards;
