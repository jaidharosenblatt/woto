import React, { useContext, useState } from "react";
import { Row, Col, Card, Space, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import ParticipantsList from "./ParticipantsList";
import HideWotoButton from "../../../components/buttons/HideWotoButton";
const WotoGroupOwner = () => {
  const { state, dispatch } = useContext(HelpContext);

  const roomName = state.discussion?.description?.roomName || "Your Woto Room";
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(roomName);

  const handleTitleSubmit = () => {
    setEditTitle(false);
    functions.editDiscussion(state, dispatch, { roomName: title });
  };

  return (
    <Card
      title={
        <Row align="middle">
          <Col xs={9} md={14}>
            {editTitle ? (
              <Space>
                <h2>
                  <Input
                    style={{ fontSize: 20 }}
                    defaultValue={roomName}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onPressEnter={handleTitleSubmit}
                  />
                </h2>

                <CheckCircleOutlined onClick={handleTitleSubmit} />
              </Space>
            ) : (
              <h2
                style={{ cursor: "pointer" }}
                onClick={() => setEditTitle(true)}
              >
                {title}
              </h2>
            )}
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
