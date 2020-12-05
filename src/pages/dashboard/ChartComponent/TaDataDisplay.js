import React from "react";
import { Row, Col } from "antd";

import TripleStatCard from "../../../components/analytics/dashboard/TripleStatCard";
import { SmileBlackImage, FrowmBlackOutline } from "../../../static/Images";
import DoubleCircDisplay from "../../../components/analytics/dashboard/DoubleCircDisplay";

const getSatisfactionImage = (satRate) => {
  if (satRate >= 70) {
    return SmileBlackImage;
  } else {
    return FrowmBlackOutline;
  }
};

const TaDataDisplay = (props) => {
  const styles = {
    chartDisplay: {
      width: "100%",
      // width: "calc(100vw - 75px)",
      height: "100%",
    },
  };
  return (
    <div className="chartDisplay" style={styles.chartDisplay} type="flex">
      <Row justify="center">
        <Col span={24}>
          <TripleStatCard
            satisfactionRate={`${satisfactionRate}%`}
            satisfactionImage={getSatisfactionImage(satisfactionRate)}
            studentsSeen={studentsSeen}
            notHelped={notHelped}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <DoubleCircDisplay
            Circle1Data={props.interactionData}
            Circle2Data={props.waitData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TaDataDisplay;
//sm={24} md={22} lg={22} xl={22}
///DATA VARIABLES/////
const satisfactionRate = 70;
const studentsSeen = 56;
const notHelped = 12;
