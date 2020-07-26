import React from "react";
import { Card, Row } from "antd";

const props = {
  owner: "Goonie",
  description: {
    assignment: "HW1",
    stage: "Just Getting Started",
    concepts: "Linked List",
    zoomlink: "URL",
    details: "details test",
    size: "2",
  },
  participants: {
    student1: "name",
    student2: "name2",
  },
};
const WotoInteraction = () => {
  return (
    <Card>
      <Row>
        <h2> You're working with {props.owner}.</h2>
      </Row>
    </Card>
  );
};
export default WotoInteraction;
