import React from "react";
import { Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";

const ActiveHeader = ({ courseName }) => {
  return (
    <Col span={24}>
      <TitleHeader
        title={`${courseName} Office Hours`}
        details={<LocationTimeTag location="Virtual" time="Now until 4pm" />}
      />
    </Col>
  );
};

export default ActiveHeader;
