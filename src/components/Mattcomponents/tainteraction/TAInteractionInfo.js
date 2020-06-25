import React from 'react';
import { Row, Col,Button, Space} from "antd";
import {ClockImage, LocationImage, AssignmentIcon, PageIcon, ListIcon, HelpIcon} from "../../../static/Images"

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({studentName, assignment, problem, place, question, time, location}) =>{
  return(
    <div>
    <h2 className="InteractionTitle">
      <b> Helping {studentName} </b>
    </h2>
    <Space direction="vertical">
      <Row align="left">
        <Col align="left">
          <p className = "InteractionUnderText1">
            <img src={ClockImage} alt ="Clock"  />
             &nbsp;  Notified {time} minutes ago &nbsp;
            <img src={LocationImage} alt ="Location Pin"  /> &nbsp;
              <b className="InteractionEmphasis">{location} </b>
          </p>
        </Col>
      </Row>

      <Row >
      <Space size="middle">
        <img className="" src ={AssignmentIcon} alt ="Assignment Icon"  />
        <p className="InteractionUserInfo"> Assignment {assignment} </p>
        </Space>
      </Row>

      <Row>
        <Space size="middle">
            <img className="InteractionPageIcon" src ={PageIcon} alt ="Page Icon"  />
            <p className="InteractionUserInfo"> Problem {problem} </p>
        </Space>
      </Row>

      <Row>
        <Space size="middle">
            <img src ={ListIcon} alt ="List Icon"  />
            <p className="InteractionUserInfo">{place} </p>
        </Space>
      </Row>

      <Row>
      <Space size="middle">
          <img className="" src ={HelpIcon} alt="Help Icon" />
          <p className="InteractionUserInfo"> {question} </p>
        </Space>
      </Row>

      <Row>
          <Space size="middle">
            <Button > Notify Again </Button>
            <Button type="danger"> End Interaction</Button>
          </Space>
      </Row>
    </Space>

    </div>);
}
export default InteractionInfo;