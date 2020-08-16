import React from "react";
import { Col } from "antd";

import Stat from "./Stat";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
/**
 * @jaidharosenblatt Display stat cards based on student views
 */
const blue = { color: "#1890FF" };
const InteractionsHelpedStats = ({ stats }) => {
  return (
    <Col span={24}>
      <Stat
        title="Average Interaction"
        value={stats.averageLength}
        alt="clock"
        footer="minutes"
        image={<ClockCircleOutlined style={blue} />}
      />

      <Stat
        title="Helped"
        value={stats.helped}
        footer="students"
        alt="people"
        image={<TeamOutlined style={blue} />}
      />
      <Stat
        title="Student Waiting"
        value={stats.waiting}
        alt="students"
        footer="students"
        image={<HourglassOutlined style={blue} />}
      />
    </Col>
  );
};

export default InteractionsHelpedStats;
