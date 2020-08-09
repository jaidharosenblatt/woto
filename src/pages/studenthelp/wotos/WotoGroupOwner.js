import React, { useContext } from "react";
import { Row, Col, Card, Space } from "antd";

import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import ParticipantsList from "./ParticipantsList";
import HideWotoButton from "../../../components/buttons/HideWotoButton";
const WotoGroupOwner = () => {
  const { state, dispatch } = useContext(HelpContext);

  return (
    <Card
      title={
        <Row align="middle">
          <Col xs={9} md={14}>
            <h2>
              {state.discussion?.description?.roomName || "Your Woto Room"}
            </h2>
          </Col>
          <Col xs={15} md={10} align="right">
            <HideWotoButton
              handleLeave={() => functions.archiveDiscussion(state, dispatch)}
            />
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
            <ParticipantsList discussion={state.discussion} />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
export default WotoGroupOwner;
