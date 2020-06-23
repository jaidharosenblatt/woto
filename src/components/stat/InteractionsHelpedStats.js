import React from "react";
import { Row, Col } from "antd";

import Stat from "./Stat";
import { QueueImage, ClockImageBlue } from "../../static/Images";

/**
 * @jaidharosenblatt Display stat cards based on student views
 */
const InteractionsHelpedStats = () => {
  return (
    <Row>
      <Col span={12}>
        <Stat
          title="Average Interaction"
          value={25}
          alt="clock"
          footer="minutes"
          image={ClockImageBlue}
        />
      </Col>
      <Col span={12}>
        <Stat
          title="Helped"
          value={10}
          footer="students"
          alt="people"
          image={QueueImage}
        />
      </Col>
    </Row>
  );
};

export default InteractionsHelpedStats;
