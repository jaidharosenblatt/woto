import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Row, Col, Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";

const WotoGroup = ({ discussion }) => {
  const { state, dispatch } = useContext(HelpContext);
  const authContext = useContext(AuthContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const isOwner = discussion?.owner._id === authContext.state.user._id;

  const name = discussion?.owner?.name?.split(" ")[0];
  const roomName = isOwner
    ? "Your Room"
    : discussion?.description?.roomName || `${name}'s Room`;

  const handleLeave = () => {
    if (isOwner) {
      functions.archiveDiscussion(state, dispatch);
    } else {
      functions.leaveDiscussion(state, dispatch);
    }
  };
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
            <Button danger type="primary" onClick={handleLeave}>
              {isOwner ? "Delete Room" : "Leave Room"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Row gutter={16}>
        <Col xs={24} md={8} align="right">
          <Avatars
            discussion={discussion}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </Col>
        <Col xs={24} md={16}>
          {discussion.participants?.length > 1 && (
            <ParticipantQuestion
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              discussion={discussion}
              highlightKeys={state.commonValues}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
};
export default WotoGroup;
