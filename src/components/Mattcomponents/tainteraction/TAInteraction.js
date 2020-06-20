import React from 'react';
import { Row, Col, Avatar, Button, Tag } from "antd";

import { DefaultProfile } from "../../../static/Images";
import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const TAInteraction = () => {
  return(
    <div className="InteractionWrapper">
      <Row align="left">
        <Col xs={5}>
          <div className="InteractionStudentPic">
            <Avatar size={200} src={ DefaultProfile}  />
          </div>
        </Col>
        <Col xs ={14}>
        <div className="InteractionFixedInner">
          <TAInteractionInfo
            studentName = "Matthew Sclar"
            assignment = "3"
            problem = "1"
            place = "Just getting started"
            question= "Don't know what a linked list is"
            time ="3"
            location="Virtual Room"/>
        </div>
        </Col>

        <Col xs ={5}>
        <div className="InteractionTagContainer">
          <InteractionTags
          options={[
              {
                tag: "Linked List",
              },
              {
                tag: "Hash Table",
              },
              {
                tag: "Array",
              },
            ]} />
        </div>
        </Col>
      </Row>

    </div>
  )
}
export default TAInteraction;
