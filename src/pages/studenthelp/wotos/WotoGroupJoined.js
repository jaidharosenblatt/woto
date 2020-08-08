import React, { useContext } from "react";
import { Row, Col, Card, Space, Button } from "antd";
import { HelpContext } from "../util/HelpContext";
import functions from "../util/functions";

import CollapsedQuestion from "../../../components/collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import ParticipantsList from "./ParticipantsList";
const WotoGroupJoined = ({ similarKeys }) => {
  const { state, dispatch } = useContext(HelpContext);

  return (
    <Card
      headStyle={{ padding: "14px 16px" }}
      title={
        <Row>
          <Col xs={9} md={14}>
            <Space direction="vertical">
              <h2>{state.discussionParticipant.name}</h2>
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
            </Button>{" "}
          </Col>
        </Row>
      }
    >
      <Row gutter={[50, 0]}>
        <Col xs={24} md={16}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <h2 style={{ fontSize: "16px" }}>
              {state.discussionParticipant.name}'s Question
            </h2>
            <CollapsedQuestion
              details={state.discussionParticipant.description}
              highlightKeys={similarKeys}
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
            <ParticipantsList
              discussionParticipant={state.discussionParticipant}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
export default WotoGroupJoined;
