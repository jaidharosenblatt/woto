import React from "react";
import { Space, Card } from "antd";
import "./centered.css";

/**
 * Render a card centered on page
 * @param children items to render in card
 */
const PageCard = (props) => {
  return (
    <div className="page-card">
      <Space size={0} align="center">
        <Card>{props.children}</Card>
      </Space>
    </div>
  );
};

export default PageCard;
