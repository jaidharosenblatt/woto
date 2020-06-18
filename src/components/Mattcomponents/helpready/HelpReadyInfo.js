import React from 'react';
import { Row, Col} from "antd";
import {ClockImage, PersonOutline} from "../../../static/Images"

/**
 * @matthewsclar Page for students to recieve help for a given course
 *
 */

const GettingHelpInfo = ({TAname, position, time}) =>{
  return(
    <div className ="HelpingFixedGroup">
    <h2 className="HelpingTitle">
      <b> Help From {TAname} </b>
    </h2>
    <br/>

    <Row>
      <Col xs ={2}>
        <img className="HelpingPerson" src ={PersonOutline} />
      </Col>
    <Col xs={22}>
      <p className="HelpingUserInfo"> {position} </p>
    </Col>
    </Row>
    <Row>
      <Col xs ={2}>
        <img className="HelpingClock" src ={ClockImage} />
      </Col>
    <Col xs={22}>
      <p className="HelpingUserInfo"> Notified {time} minutes ago </p>
    </Col>
    </Row>



    </div>);
}
export default GettingHelpInfo;
