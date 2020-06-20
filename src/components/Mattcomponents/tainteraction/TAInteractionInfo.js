import React from 'react';
import { Row, Col,Button, Space} from "antd";
import {ClockImage, LocationImage, AssignmentIcon, PageIcon, ListIcon, HelpIcon} from "../../../static/Images"

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({studentName, assignment, problem, place, question, time, location}) =>{
  return(
    <div className ="InteractionFixedGroup">
    <h2 className="InteractionTitle">
      <b> Helping {studentName} </b>
    </h2>
    <Space direction="vertical">
      <Row>
        <Col align="left" xs={24}>
          <p className = "InteractionUnderText1">
            <img src={ClockImage} />
             &nbsp;  Notified {time} minutes ago &nbsp;
            <img src={LocationImage} /> &nbsp;
              <b className="InteractionEmphasis">{location} </b>
          </p>
        </Col>
      </Row>

      <Row >
      <Space size="middle">
        <img className="" src ={AssignmentIcon} />
        <p className="InteractionUserInfo"> Assignment {assignment} </p>
        </Space>
      </Row>

      <Row>
        <Space size="middle">
            <img className="InteractionPageIcon" src ={PageIcon} />
            <p className="InteractionUserInfo"> Problem {problem} </p>
        </Space>
      </Row>

      <Row>
        <Space size="middle">
            <img className="" src ={ListIcon} />
            <p className="InteractionUserInfo">{place} </p>
        </Space>
      </Row>

      <Row>
      <Space size="middle">
          <img className="" src ={HelpIcon} />
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
