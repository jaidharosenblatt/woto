import React from "react";
import { Card, Row, Col } from "antd";
import HelpForm from "./HelpForm";

const FormCard = () => {
  return (
    <Card title={HelpFormTitle}>
      <HelpForm />
    </Card>
  );
};
const HelpFormTitle = (
  <Col>
    <Row>
      <h2>Ask a Question</h2>
    </Row>
    <Row>
      <Col xs={0} sm={24}>
        <p>If you have multiple questions, just ask one for now</p>
      </Col>
    </Row>
  </Col>
);

export default FormCard;
