import React from "react";
import { Row, Col } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import MiniStat from "./MiniStat";
import { convertDateString } from "../../utilfunctions/timeAgo";

const WaitQueueStatMiniCards = ({ queuePosition, joinedAt }) => {
  return (
    <Row gutter={8}>
      <Col xs={24} md={8}>
        <MiniStat
          label="Your Spot"
          icon={<TeamOutlined />}
          text={`${queuePosition}/10`}
          unit="students"
        />
      </Col>
      <Col xs={24} md={8}>
        <MiniStat
          label="Expected Wait Time"
          icon={<ClockCircleOutlined />}
          text={queuePosition * 5}
          unit="minutes"
        />
      </Col>
      <Col xs={24} md={8}>
        <MiniStat
          label="Joined At"
          icon={<HistoryOutlined />}
          text={convertDateString(joinedAt)}
        />
      </Col>
    </Row>
  );
};
export default WaitQueueStatMiniCards;
