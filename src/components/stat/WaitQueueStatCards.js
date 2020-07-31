import React from "react";
import { Row, Col } from "antd";

import Stat from "./Stat";
import { ClockCircleOutlined, TeamOutlined } from "@ant-design/icons";
/**
 * @jaidharosenblatt Display stat cards based on student views
 */
const blue = { color: "#1890FF" };
const WaitQueueStatCards = ({ inQueue }) => {
  return (
    <Row>
      <Col span={12}>
        <Stat
          title={inQueue ? "Your Spot" : "Queue"}
          value={inQueue ? "2/10" : "10"}
          footer="students"
          alt="people"
          image={<TeamOutlined style={blue} />}
        />
      </Col>
      <Col span={12}>
        <Stat
          title="Wait Time"
          value={25}
          alt="clock"
          footer="minutes"
          image={<ClockCircleOutlined style={blue} />}
        />
      </Col>
    </Row>
  );
};

export default WaitQueueStatCards;
