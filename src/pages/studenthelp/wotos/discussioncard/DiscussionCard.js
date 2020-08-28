import React, { useContext, useState } from "react";
import { Card, Row, Col, Button, Space, Tooltip } from "antd";
import StudentsTag from "../../../../components/header/StudentsTag";
import { convertTimeAgo } from "../../../../utilfunctions/timeAgo";
import { ReloadOutlined } from "@ant-design/icons";
import { HelpContext } from "../../util/HelpContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import ParticipantQuestion from "./ParticipantQuestion";
import Avatars from "./Avatars";
import functions from "../../util/functions";

const DiscussionCard = ({ discussion }) => {
  console.log(discussion);
  const { state, dispatch } = useContext(HelpContext);
  const authContext = useContext(AuthContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const inDiscussion =
    (state.discussion && !state.discussion.archived) ||
    state.discussionParticipant;

  //filter out inactive participants
  const participants = discussion.participants.filter((item) => item.active);

  var roomName =
    discussion.description.roomName ||
    `${discussion.owner.name.split(" ")[0]}'s Room`;

  const handleJoin = () => {
    window.scrollTo(0, 0);
    functions.joinDiscussion(state, dispatch, discussion, authContext.state);
  };

  const isOwner = discussion.owner._id === authContext.state.user._id;
  if (isOwner) {
    roomName = "Your Room";
  }

  return (
    <Card loading={state.loading} className="discussion-card">
      <Row align="middle" gutter={16}>
        <Col xs={24} md={8}>
          <Space direction="vertical">
            <Space align="center">
              <h2>{roomName}</h2>
              {inDiscussion ? (
                <Button className="mobile-only" disabled>
                  {isOwner ? "Your Room" : "Join Room"}
                </Button>
              ) : (
                <Button
                  onClick={handleJoin}
                  type="primary"
                  className="mobile-only"
                >
                  Join
                </Button>
              )}
            </Space>

            <Space>
              <StudentsTag length={participants.length} />
              <h3>
                <ReloadOutlined />
                {` Active ${convertTimeAgo(new Date(discussion.updatedAt))}`}
              </h3>
            </Space>
            <Avatars
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              participants={participants}
            />
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <ParticipantQuestion
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            discussion={discussion}
            highlightKeys={state.commonValues}
          />
        </Col>
        <Col xs={0} md={4} align="right">
          {inDiscussion ? (
            <Tooltip title="You must leave your existing room">
              <Button disabled size="large">
                {isOwner ? "Your Room" : "Join Room"}
              </Button>
            </Tooltip>
          ) : (
            <Button onClick={handleJoin} size="large" type="primary">
              Join Room
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default DiscussionCard;
