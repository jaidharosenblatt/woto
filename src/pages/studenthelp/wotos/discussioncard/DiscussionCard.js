import React, { useContext, useState } from "react";
import { Card, Row, Col, Button, Space, Tooltip } from "antd";
import StudentsTag from "../../../../components/header/StudentsTag";
import { convertTimeAgo } from "../../../../utilfunctions/timeAgo";
import { ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../contexts/AuthContext";
import ParticipantQuestion from "./ParticipantQuestion";
import Avatars from "./Avatars";
import { connect } from "react-redux";
import selectors from "../../../../redux/courses/selectors";

const DiscussionCard = ({ courses, discussion, joinDiscussion }) => {
  const authContext = useContext(AuthContext);
  const userID = authContext.state.user._id;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { loading, course, activeDiscussion } = redux.select(courses, courseID);
  const courseID = course?._id;

  //filter out inactive participants
  const participants = discussion.participants.filter((item) => item.active);

  var roomName =
    discussion.description.roomName ||
    `${discussion.owner.name.split(" ")[0]}'s Room`;

  const handleJoin = () => {
    window.scrollTo(0, 0);
    joinDiscussion(courseID, userID, discussion._id);
  };

  const isOwner = discussion.owner._id === userID;
  if (isOwner) {
    roomName = "Your Room";
  }

  return (
    <Card loading={loading} className="discussion-card">
      <Row align="middle" gutter={16}>
        <Col xs={24} md={8}>
          <Space direction="vertical">
            <Space align="center">
              <h2>{roomName}</h2>
              {activeDiscussion ? (
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
            highlightKeys={null}
          />
        </Col>
        <Col xs={0} md={4} align="right">
          {activeDiscussion ? (
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
    course: selectors.getCourse(state),
    activeDiscussion: selectors.getDiscussions(state),
  };
};

export default connect(mapStateToProps)(DiscussionCard);
