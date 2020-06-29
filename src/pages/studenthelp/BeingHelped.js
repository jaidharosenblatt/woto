import React from "react";
import { Row, Col } from "antd";

import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import YourQuestionCard from "../../components/collapsedquestion/YourQuestionCard";
import PastCollaboratorsCard from "../../components/collaborators/PastCollaborators.js";
import ActiveHeader from "./ActiveHeader";

const BeingHelped = ({ question }) => {
  return (
    <Row align="center">
      <ActiveHeader />
      <Col xs={24} md={16}>
        <HelpReady />
      </Col>
      <Col xs={24} md={8}>
        <YourQuestionCard details={question} />
      </Col>
      <Col span={24}>
        <PastCollaboratorsCard />
      </Col>
    </Row>
  );
};

export default BeingHelped;
