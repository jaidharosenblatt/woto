import React from "react";
import { Row, Col, Card, Space, Button } from "antd";
import CollapsedQuestion from "../../../components/collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import ParticipantsList from "./ParticipantsList";
const WotoGroupJoined = (props) => {
  return (
    <Card
      headStyle={{ padding: "14px 16px" }}
      title={
        <Row>
          <Col xs={9} md={14}>
            <Space direction="vertical">
              <h2>{props.discussionParticipant.name}'s Woto Room</h2>
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
            <Button danger type="primary" onClick={props.leaveDiscussion}>
              Leave Room
            </Button>{" "}
          </Col>
        </Row>
      }
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} md={16}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <h2 style={{ fontSize: "16px" }}>
              {props.discussionParticipant.name}'s Question
            </h2>
            <CollapsedQuestion
              details={props.discussionParticipant.description}
              highlightKeys={props.similarKeys}
              words
            />
          </Space>
        </Col>

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
export default WotoGroupJoined;
