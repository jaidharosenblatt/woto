import React from "react";
import { Row, Col, Avatar, Card } from "antd";

import { DefaultProfile } from "../../../static/Images";
import TAInteractionInfo from "./TAInteractionInfo";
import InteractionTags from "./InteractionTags";
import "./TAInteraction.css";

const TAInteraction = () => {
  return (
    <Card className="TAInteraction">
      <Row align="left">
        <Col align="center" xs={24} md={7}>
          <div className="InteractionStudentPic">
            <Avatar src={DefaultProfile} />
          </div>
        </Col>
        <Col align="left" xs={19} md={11}>
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

        <Col align="left" xs={5} md={6}>
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
              {
                tag: "Linked List",
              },
              {
                tag: "Linked List",
              },
              {
                tag: "Linked List",
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
};
export default TAInteraction;
