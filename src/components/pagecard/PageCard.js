import React from "react";
import { Space, Card } from "antd";
import "./pagecard.css";

/**
 * Render a card centered on page
 * @param children items to render in card
 */
const PageCard = (props) => {
  return (
    <div className="page-card-wrapper">
      <Space size={0} align="center">
        <div>
          <Card>{props.children}</Card>
        </div>
        <div style={{ display: "none" }}>{props.children}</div>
      </Space>
    </div>
  );
};

export default PageCard;
