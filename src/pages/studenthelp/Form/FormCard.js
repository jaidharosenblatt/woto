import React from "react";
import { Card, Row, Col, Space } from "antd";
import HelpForm from "./HelpForm";

/**
 * @jaidharosenblatt Adds a HelpForm to a card along with a title
 */
const HelpFormTitle = (
  <Col>
    <Space direction="vertical" size={8}>
      <Row>
        <h2>Ask a Question</h2>
      </Row>
      <Row>
        <Col xs={0} sm={24}>
          <p>If you have multiple questions, just ask one for now</p>
        </Col>
      </Row>
    </Space>
  </Col>
);

const FormCard = ({ onFormSubmit }) => {
  return (
    <Card title={HelpFormTitle}>
      <HelpForm onFormSubmit={onFormSubmit} />
    </Card>
  );
};

export default FormCard;