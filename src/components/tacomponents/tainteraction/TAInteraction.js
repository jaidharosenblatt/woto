import React from "react";
import { Row, Col, Avatar, Card } from "antd";

import { DefaultProfile } from "../../../static/Images";

import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const tags = ["Linked List", "Hash Table", "Array"];
const TAInteraction = ({ details, suggestedLength }) => {
  return (
    <Card className="TAInteraction">
      <Row>
        <Col align="right" xs={24} md={0}>
          <InteractionTags options={tags} />
        </Col>
      </Row>
      <Row align="left">
        <Col align="center" xs={24} md={8}>
          <div>
            <Avatar src={DefaultProfile} />
          </div>
        </Col>
        <br />
        <Col align="left" xs={24} md={10}>
          <div className="InteractionFixedInner">
            <TAInteractionInfo
              details={details}
              studentName="Matthew Sclar"
              time="3"
              location="Virtual Room"
              suggestedLength={suggestedLength}
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
