import React from "react";
import { Col, Row } from "antd";
import Stat from "./Stat";
import {
  ClockCircleOutlined,
  TeamOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import "./Stat.css";
/**
 * @jaidharosenblatt Display stat cards based on student views
 */
const blue = { color: "#1890FF" };
const InteractionsHelpedStats = ({ stats, horizontal }) => {
  const statCards = [
    <Stat
      key="interactions"
      title="Average Interaction"
      value={stats?.averageLength}
      alt="clock"
      footer="minutes"
      image={<ClockCircleOutlined style={blue} />}
    />,
    <Stat
      key="helped"
      title="Helped"
      value={stats?.helped}
      footer="students"
      alt="people"
      image={<TeamOutlined style={blue} />}
    />,
    <Stat
      key="waiting"
      title="Student Waiting"
      value={stats?.waiting}
      alt="students"
      footer="students"
      image={<HourglassOutlined style={blue} />}
    />,
  ];

  return (
    <>
      {horizontal ? (
        <Row className="interaction-helped">
          {statCards.map((card, i) => {
            return (
              <Col key={i} span={8}>
                {card}
              </Col>
            );
          })}
        </Row>
      ) : (
        <Col span={24} className="interaction-helped">
          {statCards}
        </Col>
      )}
    </>
  );
};

export default InteractionsHelpedStats;
