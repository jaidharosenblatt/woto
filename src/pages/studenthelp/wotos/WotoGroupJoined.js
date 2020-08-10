import React, { useContext, useState } from "react";
import { Row, Col, Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";

const WotoGroupJoined = () => {
  const { state, dispatch } = useContext(HelpContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const name = state.discussionParticipant?.owner?.name?.split(" ")[0];
  const roomName =
    state.discussionParticipant?.description?.roomName || `${name}'s Room`;
  return (
    <Card
      headStyle={{ padding: "14px 16px" }}
      className="discussion-card"
      title={
        <Row>
          <Col xs={9} md={14}>
            <Space direction="vertical">
              <h2>{roomName}</h2>
              <Timer
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              >
                <p>
                  You've been working here for <Timer.Minutes />:
                  <Timer.Seconds
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value}`
                    }
                  />
                </p>
              </Timer>
            </Space>
          </Col>
          <Col xs={15} md={10} align="right">
            <Button
              danger
              type="primary"
              onClick={() => functions.leaveDiscussion(state, dispatch)}
            >
              Leave Room
            </Button>
          </Col>
        </Row>
      }
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} md={16}>
          <ParticipantQuestion
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            discussion={state.discussionParticipant}
            highlightKeys={state.commonValues}
          />
        </Col>

        <Col xs={24} md={8}>
          <Avatars
            discussion={state.discussionParticipant}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </Col>
      </Row>
    </Card>
  );
};
export default WotoGroupJoined;
