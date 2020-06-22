import React from "react";
import { Row, Col, Avatar, Card } from "antd";

import { DefaultProfile } from "../../../static/Images";
import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const tags = [
  {
    tag: "Linked List",
  },
  {
    tag: "Hash Table",
  },
  {
    tag: "Array",
  },
  {
    tag: "Array",
  },
  {
    tag: "Array",
  },
];
const TAInteraction = () => {
  return (
    <Card className="TAInteraction">
      <Row>
        <Col align="right" xs={24} md={0}>
          <InteractionTags options={tags} />
        </Col>
      </Row>
      <Row align="left">
        <Col align="center" xs={24} md={7}>
          <div className="InteractionStudentPic">
            <Avatar src={DefaultProfile} />
          </div>
        </Col>
        <Col align="left" xs={24} md={11}>
          <div className="InteractionFixedInner">
            <TAInteractionInfo
              studentName="Matthew Sclar"
              assignment="3"
              problem="1"
              place="Just getting started"
              question="Don't know what a linked list is"
              time="3"
              location="Virtual Room"
            />
          </div>
        </Col>

        <Col align="right" xs={0} md={6}>
          <InteractionTags options={tags} />
        </Col>
      </Row>
    </Card>
  );
};
export default TAInteraction;
