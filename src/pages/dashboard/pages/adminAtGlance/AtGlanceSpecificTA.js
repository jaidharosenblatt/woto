import React from "react";
import TAInfo from "./TAInfo";
import SpecificTaDataDisplay from "./SpecificTaDataDisplay";
import { Row, Col } from "antd";
import PastInteractions from "../../Tables/PastInteractions";

class AtAGlanceSpecificTA extends React.Component {
  render() {
    const TAProfile = this.props.taProfile;
    return (
      <div className="atAGlanceSpecific">
        <Col span={24}>
          <Row justify="center">
            <Col span={24}>
              <h5>{`${TAProfile.name}'s Performance between ${StartDate} - ${EndDate}`}</h5>
            </Col>
          </Row>
          <Row justify="center">
            <Col flex="auto" lg={24} xl={12}>
              <SpecificTaDataDisplay
                interactionData={InteractionData}
                waitTimeData={WaitTimeData}
              />
            </Col>
            <Col flex="auto" lg={24} xl={12}>
              <TAInfo profile={TAProfile} />
            </Col>
          </Row>

          <Row justify="center">
            <Col flex="auto" span={24}>
              <PastInteractions
                tableData={PAST_INTERACTIONS_DATA}
                taFirstName={TAProfile.name}
              />
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default AtAGlanceSpecificTA;

///DATA VARIABLES/////
const StartDate = "May 10th";
const EndDate = "June 9th";

//const taFirstName = "Jaidha"

const PAST_INTERACTIONS_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    waitTime: "13:32",
    interactionLength: "11:30",
    time: "3:49pm",
    rating: "thumbsUp",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    hwNumber: "2",
    problemNumber: "3",
    stage: "Just Started",
    waitTime: "24:02",
    interactionLength: "4:30",
    time: "3:45pm",
    rating: "thumbsUp",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Understand Question",
    waitTime: "12:23",
    interactionLength: "11:30",
    time: "3:15pm",
    rating: "thumbsUp",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    waitTime: "49:30",
    interactionLength: "11:30",
    time: "3:03pm",
    rating: "thumbsDown",
  },
];

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
