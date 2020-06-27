import React from "react";
import { Card } from "antd";
import "./Help.css";

const InactiveSessionCard = () => {
  return (
    <Card>
      <div className="inactive-session-container">
        Asking a question is disabled while no active session is occuring
      </div>
    </Card>
  );
};

export default InactiveSessionCard;
