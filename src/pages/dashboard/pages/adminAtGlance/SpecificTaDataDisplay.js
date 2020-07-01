//sessionsAttended
import React from "react";
import { Row, Col } from "antd";

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


  const styles = {
    chartDisplay: {
      width: "100%",
     // width: "calc(100vw - 75px)",
      height: "100%",
     
  },
};

const SpecificTaDataDisplay = (props) => {
  return (
    <div className="chartDisplay" style={styles.chartDisplay}>
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
        <Col  span={24}>
          <DoubleCircDisplay
            Circle1Data={props.interactionData}
            Circle2Data={props.waitTimeData}
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

