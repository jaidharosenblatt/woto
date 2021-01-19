import React from "react";
import { Space } from "antd";

export default function TitleStat({ title, icon, color }) {
  return (
    <Space>
      <div style={{ backgroundColor: color }} className="circle-icon-small">
        {React.cloneElement(icon, {
          style: { color: "white" },
        })}
      </div>
      <h2 style={{ color }}>{title}</h2>
    </Space>
  );
}
