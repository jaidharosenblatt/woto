import { TeamOutlined } from "@ant-design/icons";
import { Card, Col, Space } from "antd";
import React from "react";
import TitleStat from "../sessions/TitleStat";
import "./analytics-card.css";

export default function AnalyticsCard({
  color = "#40A9FF",
  icon,
  title,
  value,
}) {
  return (
    <Card className="analytics-card">
      <Col align="middle" span={24}>
        <Space align="center" size={24}>
          <div style={{ backgroundColor: color }} className="circle-icon">
            {React.cloneElement(icon, {
              style: { color: "white", fontSize: 24 },
            })}
          </div>

          <Space direction="vertical">
            <h1 style={{ color }}>{value}</h1>
            <h6>{title}</h6>
          </Space>
        </Space>
      </Col>
    </Card>
  );
}
