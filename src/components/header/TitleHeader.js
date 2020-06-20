import React from "react";
import { Card, Space } from "antd";
import "./header.css";

/**
 * @jaidharosenblatt Header card for top of student/TA pages
 */
const TitleHeader = (props) => {
  return (
    <Card>
      <img className="FloatingImage" src={props.image} alt={props.alt} />
      <div className="HeaderWrapper">
        <div className="HeaderText">
          <Space size={4} direction="vertical">
            <h1>{props.title}</h1>
            <h2>{props.details}</h2>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default TitleHeader;
