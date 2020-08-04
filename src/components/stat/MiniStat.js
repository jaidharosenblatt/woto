import React from "react";
import { Space } from "antd";
import "./Stat.css";
const MiniStat = ({ label, icon, text, unit }) => {
  return (
    <div className="mini-stat">
      <Space>
        <p>{icon} </p>
        <p> {label} </p>
      </Space>

      <b>{text}</b>
      <h3>{unit}</h3>
    </div>
  );
};

export default MiniStat;
