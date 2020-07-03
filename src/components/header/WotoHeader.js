import React from "react";
import { Col } from "antd";

import TitleHeader from "./TitleHeader";
import LocationTimeTag from "./LocationTimeTag";

const WotoHeader = ({ courseName }) => {
  return (
    <Col span={24}>
      <TitleHeader
        title={`${courseName} Woto Room`}
        details={<LocationTimeTag time="No Active Office Hour Sessions" />}
      />
    </Col>
  );
};

export default WotoHeader;
