import React from "react";
import { Row, Col, Card, Space } from "antd";
import ParticipantsList from "./ParticipantsList";
import HideWotoButton from "../../../components/buttons/HideWotoButton";
const WotoGroupOwner = (props) => {
  return (
    <Card
      title={
        <Row align="middle">
          <Col xs={9} md={14}>
            <h2>Your Woto Room</h2>
          </Col>
          <Col xs={15} md={10} align="right">
            <HideWotoButton handleLeave={props.archiveDiscussion} />
          </Col>
        </Row>
      }
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} md={8}>
          <Space
            className="group-interaction"
            direction="vertical"
            style={{ width: "100%" }}
          >
            <h2 style={{ fontSize: "16px" }}>Participants</h2>
            <ParticipantsList {...props} />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
export default WotoGroupOwner;
