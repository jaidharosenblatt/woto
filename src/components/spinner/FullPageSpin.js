import React from "react";
import { Spin } from "antd";
import "./spinner.css";

const FullPageSpin = () => {
  return (
    <div className="full-page-spinner">
      <Spin size="large" />
    </div>
  );
};

export default FullPageSpin;
