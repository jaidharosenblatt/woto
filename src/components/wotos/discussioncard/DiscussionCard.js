import React, { useState } from "react";
import { Card, Row, Col, Button, Space, Tooltip } from "antd";
import StudentsTag from "../../course/header/StudentsTag";
import util from "../../../util";
import { ReloadOutlined } from "@ant-design/icons";
import ParticipantQuestion from "./ParticipantQuestion";
import Avatars from "./Avatars";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";

const DiscussionCard = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const discussion = props.activeDiscussion || {};
  //filter out inactive participants
  const roomName = discussion.description.roomName || "Your Woto Room";

  const handleJoin = () => {
    window.scrollTo(0, 0);
    joinDiscussion(discussion._id);
  };

  const isOwner = discussion.owner === props.userID;

  return (
    <Card loading={props.loading} className="discussion-card">
      <Row align="middle" gutter={16}>
        <Col xs={24} md={8}>
          <Space direction="vertical">
            <Space align="center">
              <h2>{roomName}</h2>
              {discussion ? (
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
              <StudentsTag length={discussion?.participants?.length} />
              <h3>
                <ReloadOutlined />
                {` Active ${util.convertTimeAgo(
                  new Date(discussion.updatedAt)
                )}`}
              </h3>
            </Space>
            <Avatars
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              participants={discussion.participants}
            />
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <ParticipantQuestion
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            discussion={discussion}
            highlightKeys={null}
          />
        </Col>
        <Col xs={0} md={4} align="right">
          {discussion ? (
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

const mapStateToProps = (state) => {
  return {
    loading: selectors.getLoading(state),
    activeDiscussion: selectors.getDiscussions(state),
    userID: selectors.getUserID(state),
  };
};

export default connect(mapStateToProps)(DiscussionCard);
