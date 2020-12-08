//sessionsAttended
import React from "react";
import { Row, Col } from "antd";

import TripleStatCardSpecificTA from "../../analytics/dashboard/TripleStatCardSpecificTA";
import DoubleCircDisplay from "../../analytics/dashboard/DoubleCircDisplay";

const styles = {
  chartDisplay: {
    width: "100%",
    // width: "calc(100vw - 75px)",
    height: "100%",
  },
};

const SpecificTaDataDisplay = (props) => {
  return (
    <div className="chartDisplay" style={styles.chartDisplay} type="flex">
      <Row justify="center">
        <Col span={24}>
          <TripleStatCardSpecificTA
            satisfactionRate={`${satisfactionRate}%`}
            studentsSeen={studentsSeen}
            sessionsAttended={sessionsAttended}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
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
