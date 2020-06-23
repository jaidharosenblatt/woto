import React from "react";
import { Col, Row, Button } from "antd";
import { BlueQuestionMarkIcon } from "./tools/Icons";
import "./modals.css";
import HelpForm from "../../pages/help/Form/HelpForm";

const YourQuestionModal = ({ handleJoin, handleCancel }) => {
  return (
    <div>
      <Row align="middle" style={{ width: "100%" }}>
        <Col span={3}>
          <BlueQuestionMarkIcon />
        </Col>
        <Col span={12}>
          <h2>Your Question</h2>
        </Col>
        <Col span={9} align="right">
          <Button type="primary" danger>
            Leave Queue
          </Button>
        </Col>
      </Row>
      <Row>
        <HelpForm />
      </Row>

      <Row gutter={4}>
        <Col span={12}>
          <Button block type="primary" onClick={handleJoin}>
            Edit
          </Button>
        </Col>
        <Col span={12}>
          <Button block onClick={handleCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default YourQuestionModal;
