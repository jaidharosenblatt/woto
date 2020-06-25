import React from "react";
import TAInfo from "./TAInfo";
import ChartDisplay from "../../ChartComponent/ChartDisplay";
import { Col } from "antd";

class AtAGlance extends React.Component {
  render() {
    return (
      <Col span={24}>
        <TAInfo />
        <ChartDisplay />
      </Col>
    );
  }
}

export default AtAGlance;
