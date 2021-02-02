import React from "react";
import { Row, Col } from "antd";

import "../dashboard.css";
import AnalyticsCard from "../../analytics/cards/AnalyticsCard";
import { HourglassOutlined, TeamOutlined } from "@ant-design/icons";

export default function StatCards() {
  return (
    <Row>
      <Col span={12}>
        <AnalyticsCard
          icon={<TeamOutlined />}
          title="Questions Asked"
          value={26}
        />
      </Col>
      <Col span={12}>
        <AnalyticsCard
          icon={<HourglassOutlined />}
          title="Students Not Helped"
          color="#0270C9"
          value={0}
        />
      </Col>
    </Row>
  );
}
