import React, { useContext } from "react";
import { Row, Col } from "antd";

import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import PastCollaboratorsCard from "../../components/collaborators/PastCollaborators.js";
import ActiveHeader from "./ActiveHeader";

const BeingHelped = () => {
  return (
    <Row align="center">
      <ActiveHeader />
      <Col xs={24} md={16}>
        <HelpReady />
      </Col>

      <Col span={24}>
        <PastCollaboratorsCard />
      </Col>
    </Row>
  );
};

export default BeingHelped;
