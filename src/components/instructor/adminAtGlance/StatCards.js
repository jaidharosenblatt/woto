import React from "react";
import { Row, Col } from "antd";

import "../dashboard.css";
import AnalyticsCard from "../../analytics/cards/AnalyticsCard";
import { HourglassOutlined, TeamOutlined } from "@ant-design/icons";

export default function StatCards({ home = {} }) {
  return (
    <Row>
      <Col span={12}>
        <AnalyticsCard
          icon={<TeamOutlined />}
          title="Questions Asked"
          value={home.questions_asked}
        />
      </Col>
      <Col span={12}>
        <AnalyticsCard
          icon={<HourglassOutlined />}
          title="Students Not Helped"
          color="#0270C9"
          value={home.questionsUnanswered}
        />
      </Col>
    </Row>
  );
}
