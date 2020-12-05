import React from "react";
import { BellOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "./icons.css";

export const BellIcon = () => {
  return (
    <div className="modal-icon">
      <BellOutlined />
    </div>
  );
};

export const VideoIcon = () => {
  return (
    <div className="modal-icon">
      <VideoCameraOutlined />
    </div>
  );
};
