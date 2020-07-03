import React from "react";
import { Row, Col } from "antd";

import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import PastCollaboratorsCard from "../../components/collaborators/PastCollaborators.js";

const BeingHelped = () => {
  return (
    <Row align="center">
      <Col span={24}>
        <HelpReady />
      </Col>

      <Col span={24}>
        <PastCollaboratorsCard />
      </Col>
    </Row>
  );
};

export default BeingHelped;
