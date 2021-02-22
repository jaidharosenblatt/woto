import React from "react";
import { Row, Col } from "antd";
import "../dashboard.css";
import AnalyticsCard from "../../analytics/cards/AnalyticsCard";
import { HourglassOutlined, TeamOutlined } from "@ant-design/icons";

export default function StatCards({ home = {}, scrollTo }) {
  return (
    <Row>
      <Col span={12}>
        <div onClick={scrollTo} style={{ cursor: "pointer" }}>
          <AnalyticsCard
            icon={<TeamOutlined />}
            title="Questions Asked"
            value={home.questions_asked}
          />
        </div>
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
