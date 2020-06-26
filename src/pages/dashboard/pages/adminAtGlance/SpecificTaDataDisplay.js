//sessionsAttended
import React from "react";
import { Row, Col, Space } from "antd";

import TripleStatCardSpecificTA from "../../../../components/instructorData/TripleStatCardSpecificTA";
import { SmileBlackImage, FrowmBlackOutline } from "../../../../static/Images";
import DoubleCircDisplay from "../../../../components/instructorData/DoubleCircDisplay";
const getSatisfactionImage = (satRate) => {
  if (satRate >= 70) {
    return SmileBlackImage;
  } else {
    return FrowmBlackOutline;
  }
};

const SpecificTaDataDisplay = (props) => {
  return (
    <div className="chartDisplay">
      <Row justify="center">
        <Col span={24}>
          <TripleStatCardSpecificTA
            satisfactionRate={`${satisfactionRate}%`}
            satisfactionImage={getSatisfactionImage(satisfactionRate)}
            studentsSeen={studentsSeen}
            sessionsAttended={sessionsAttended}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <DoubleCircDisplay
            Circle1Data={props.interactionData}
            Circle2Data={WaitTimeData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SpecificTaDataDisplay;

///DATA VARIABLES/////
const satisfactionRate = 70;
const studentsSeen = 56;
const sessionsAttended = 12;

const InteractionData = {
  title: "Interaction Length",
  color: "#1890FF",
  units: "minutes",
  min: 5,
  max: 150,
  avg: 30,
};
const WaitTimeData = {
  title: "Wait Time",
  color: "#eb5757",
  units: "minutes",
  min: 10,
  max: 300,
  avg: 67,
};
