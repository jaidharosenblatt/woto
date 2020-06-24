import React from "react";
import { Row, Col, Avatar, Card } from "antd";

import { DefaultProfile } from "../../../static/Images";
import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const tags = ["Linked List", "Hash Table", "Array"];
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
          <div>
            <Avatar src={DefaultProfile} />
          </div>
        </Col>
        <Col align="left" xs={24} md={11}>
          <div className="InteractionFixedInner">
            <TAInteractionInfo
              details={{
                assignment: "Assignment 3",
                problem: "Problem 1",
                stage: "Just getting started",
                question: "Don't know what a linked list is",
              }}
              studentName="Matthew Sclar"
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
