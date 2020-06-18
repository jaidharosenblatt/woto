import React from 'react';
import { Row, Col, Avatar, Button } from "antd";

import { DefaultProfile } from "../../../static/Images";
import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const TAInteraction = () => {
  return(
    <div className="InteractionWrapper">
      <Row align="center">
        <Col xs={5}>
          <div className="InteractionStudentPic">
            <Avatar size={200} src={ DefaultProfile}  />
          </div>
        </Col>
        <Col xs ={19}>
        <div className="InteractionFixedInner">
          <TAInteractionInfo
            studentName = "Matthew Sclar"
            assignment = "3"
            problem = "1"
            place = "Just getting started"
            question= "Don't know what a linked list is"
            time ="3"/>
        </div>
        </Col>
        <Col xs={0}>
        <InteractionTags />
        </Col>
      </Row>

    </div>
  )
}
export default TAInteraction;
