import React from 'react';
import { Row, Col, Avatar, Button, Tag, Space, Card } from "antd";

import { DefaultProfile } from "../../../static/Images";
import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const TAInteraction = () => {
  return(
    <Card size="small" bodyStyle={{padding:"10px"}}>
      <Row align="left">

        <Col align="center" xs={24} sm={24} md={7} lg={7} xl={6} xxl={4}>
          <div className="InteractionStudentPic">
            <Avatar size={200} src={ DefaultProfile}  />
          </div>
        </Col>
        <Col align="left" xs ={19} sm ={18} md={11} lg={12}>
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


        <Col align="left" xs ={5} sm={6} md={5} >
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

    </Card>
  )
}
export default TAInteraction;
