import React from "react";
import { Space, Card } from "antd";
import "./centered.css";

/**
 * Render a card centered on page
 * @param {Arrar} children items to render in card
 * @param {Boolean} navbar whether or not to consider navbar when calc height
 */
const PageCard = (props) => {
  return (
    <div
      className="page-card"
      style={
        props.navbar ? { height: "calc(100vh - 92px)" } : { height: "100vh", marginLeft: "-220px" }
      }
    >
      <Space size={0} align="center">
        <Card>{props.children}</Card>
      </Space>
    </div>
  );
};

export default PageCard;
