import React from "react";
import { Card } from "antd";

const TitleHeader = (props) => {
  console.log(props);
  return (
    <Card style={{ width: 300 }}>
      <h1>Card content</h1>
      <p>Card content</p>
      <img src={props.image} />
    </Card>
  );
};

export default TitleHeader;
