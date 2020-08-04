import React from "react";
import { Row, Col } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import MiniStat from "./MiniStat";
import { convertDateString } from "../../utilfunctions/timeAgo";

const WaitQueueStatMiniCards = ({ joinedAt }) => {
  const queuePosition = 2;
  const averageWait = 11;
  return (
    <Row gutter={8}>
      <Col xs={24} md={8}>
        <MiniStat
          label="Your Place in Queue"
          icon={<TeamOutlined />}
          text={`${queuePosition} of 10`}
        />
      </Col>

      <Col xs={24} md={8} className="bordered-stat">
        <MiniStat
          label="Expected Wait Time"
          icon={<ClockCircleOutlined />}
          text={`${queuePosition * averageWait} mins`}
          unit={`Using ${averageWait} min avg. interaction length`}
        />
      </Col>

      <Col xs={24} md={8}>
        <MiniStat
          label="Joined Queue At"
          icon={<HistoryOutlined />}
          text={convertDateString(joinedAt)}
        />
      </Col>
    </Row>
  );
};
export default WaitQueueStatMiniCards;
