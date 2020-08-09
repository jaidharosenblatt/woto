import React, { useContext } from "react";
import { Row, Col, Card, Space } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import ParticipantsList from "./ParticipantsList";
import HideWotoButton from "../../../components/buttons/HideWotoButton";
import FormlessInput from "../../../components/form/FormlessInput";

const WotoGroupOwner = () => {
  const { state, dispatch } = useContext(HelpContext);

  const roomName = state.discussion?.description?.roomName || "Your Woto Room";

  const handleTitleSubmit = (title) => {
    functions.editDiscussion(state, dispatch, { roomName: title });
  };

  return (
    <Card
      title={
        <Row align="middle">
          <Col xs={9} md={14}>
            <FormlessInput
              defaultValue={roomName}
              onSubmit={handleTitleSubmit}
            />
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
