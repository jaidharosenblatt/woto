import React, { useContext, useState } from "react";
import { Row, Col, Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";
import Timer from "react-compound-timer";
import Avatars from "./discussioncard/Avatars";
import ParticipantQuestion from "./discussioncard/ParticipantQuestion";
import LeftRightRow from "../../../components/leftrightrow/LeftRightRow";

const WotoGroup = ({ isOwner, discussion }) => {
  const { state, dispatch } = useContext(HelpContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const buttons = (
    <Space>
      <Button
        target="_blank"
        href={discussion.description.meetingURL}
        type="primary"
      >
        Join Room
      </Button>
      <Button danger onClick={handleLeave}>
        {isOwner ? "Delete" : "Leave"}
      </Button>
    </Space>
  );
  return (
    <Card
      headStyle={{ padding: "14px 16px" }}
      className="discussion-card"
      title={
        <LeftRightRow
          left={
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
          }
          right={buttons}
        />
      }
    >
      <Row gutter={16} align="middle">
        <Col xs={24} md={8}>
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
