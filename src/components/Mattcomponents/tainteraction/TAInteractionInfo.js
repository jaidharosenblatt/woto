import React from 'react';
import { Row, Col,Button} from "antd";
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

    <br/>

    <Row gutter={[0,3]}>
      <Col align="center"xs ={1} s={1}>
        <img className="InteractionAssignmentIcon" src ={AssignmentIcon} />
      </Col>
    <Col align="left" xs={22} s={23}>
      <p className="InteractionUserInfo"> Assignment:{assignment} </p>
    </Col>
    </Row>
    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={PageIcon} />
      </Col>
    <Col align="left" xs={23}>
      <p className="InteractionUserInfo"> Problem:{problem} </p>
    </Col>
    </Row>
    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={ListIcon} />
      </Col>
    <Col align="left" xs={23}>
      <p className="InteractionUserInfo">{place} </p>
    </Col>
    </Row>
    <Row gutter={[0,3]}>
      <Col align="center"xs ={1}>
        <img className="InteractionAssignmentIcon" src ={HelpIcon} />
      </Col>
    <Col align="left" xs={23}>
      <p className="InteractionUserInfo"> {question} </p>
    </Col>
    </Row>
    <Row>
      <Col align="left" xs={7} lg={4} >
      <Button > Notify Again </Button>
      </Col>
      <Col align="left" xs={4} >
      <Button type="danger" > End Interaction</Button>
      </Col>
    </Row>

    </div>);
}
export default InteractionInfo;
