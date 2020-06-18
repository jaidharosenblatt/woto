import React from 'react';
import { Row, Col,Button} from "antd";
import {ClockImage, LocationImage, AssignmentIcon, PageIcon, ListIcon, HelpIcon} from "../../../static/Images"

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({studentName, assignment, problem, place, question, time}) =>{
  return(
    <div className ="InteractionFixedGroup">
    <h2 className="InteractionTitle">
      <b> Helping {studentName} </b>
    </h2>


    <Row>
    <Col align="center" xs={1}>
      <img src={ClockImage} />
    </Col>
    <Col align="left" xs={4}>
      <p className = "InteractionUnderText1"> Notified {time} minutes ago </p>
    </Col>
    <Col align="center" xs={1}>
      <img src={LocationImage} />
    </Col>
    <Col align="left" xs={3}>
      <p className = "InteractionUnderText2"> Virtual Room </p>
    </Col>
    </Row>
    <br/>

    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={AssignmentIcon} />
      </Col>
    <Col align="left" xs={22}>
      <p className="InteractionUserInfo"> Assignment:{assignment} </p>
    </Col>
    </Row>
    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={PageIcon} />
      </Col>
    <Col align="left" xs={22}>
      <p className="InteractionUserInfo"> Problem:{problem} </p>
    </Col>
    </Row>
    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={ListIcon} />
      </Col>
    <Col align="left" xs={22}>
      <p className="InteractionUserInfo">{place} </p>
    </Col>
    </Row>
    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={HelpIcon} />
      </Col>
    <Col align="left" xs={22}>
      <p className="InteractionUserInfo"> {question} </p>
    </Col>
    </Row>
    <Row>
      <Col align="left" xs={4} >
      <Button block> Notify Again </Button>
      </Col>
      <Col align="left" xs={4} offset={1} >
      <Button type="danger" block> End Interaction</Button>
      </Col>
    </Row>

    </div>);
}
export default InteractionInfo;
