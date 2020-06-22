import React from "react";
import { Row, Col } from "antd";
import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";
import TimeSelector from "../opensession-ta/TimeSelector";

/**
 * @matthewsclar
 *Page for me to demo my components and develop/debug
 */

const Demo = () => {
  return (
    <div>
      <Row align="center">
        <Col xs={24} lg={14}>
          <HelpReady />
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />

      <Row align="center">
        <Col xs={24} lg={18}>
          <TAInteraction />
        </Col>
      </Row>

      <br />
      <br />
      <br />
      <br />
      <Row align="center">
        <Col xs={12}>
          <TimeSelector />
        </Col>
      </Row>
    </div>
  );
};

export default Demo;
